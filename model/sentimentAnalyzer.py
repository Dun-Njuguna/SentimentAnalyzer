import os
import nltk
from flask import Flask, request, jsonify

import ssl

# Get the path to your virtual environment's directory
venv_dir = 'reviews generator/model/venv'  # Replace with the actual path

# Set the NLTK data path to a subdirectory within your virtual environment
nltk_data_dir = os.path.join(venv_dir, 'nltk_data')

# Create the directory if it doesn't exist
os.makedirs(nltk_data_dir, exist_ok=True)

# Download NLTK resources only if they don't exist in the directory
if not os.path.exists(os.path.join(nltk_data_dir, 'corpora', 'twitter_samples')):
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    nltk.download('twitter_samples', download_dir=nltk_data_dir)
    nltk.download('punkt', download_dir=nltk_data_dir)
    nltk.download('wordnet', download_dir=nltk_data_dir)
    nltk.download('averaged_perceptron_tagger', download_dir=nltk_data_dir)
    nltk.download('stopwords', download_dir=nltk_data_dir)


from nltk.corpus import twitter_samples
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import twitter_samples, stopwords
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from nltk import FreqDist, classify, NaiveBayesClassifier

import re
import string
import random

app = Flask(__name__)


def remove_noise(review_tokens, stop_words=(), min_word_length=5):
    cleaned_tokens = []

    for token, tag in pos_tag(review_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', token)
        token = re.sub("(@[A-Za-z0-9_]+)", "", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) >= min_word_length and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens
    cleaned_tokens = []

    for token, tag in pos_tag(review_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', token)
        token = re.sub("(@[A-Za-z0-9_]+)", "", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token

def get_reviews_for_model(cleaned_tokens_list):
    for review_tokens in cleaned_tokens_list:
        yield dict([token, True] for token in review_tokens)

def train_classifier():
    positive_reviews = twitter_samples.strings('positive_tweets.json')
    negative_reviews = twitter_samples.strings('negative_tweets.json')
    review_tokens = twitter_samples.tokenized('positive_tweets.json')[0]

    stop_words = stopwords.words('english')

    positive_review_tokens = twitter_samples.tokenized('positive_tweets.json')
    negative_review_tokens = twitter_samples.tokenized('negative_tweets.json')

    positive_cleaned_tokens_list = []
    negative_cleaned_tokens_list = []

    for tokens in positive_review_tokens:
        positive_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    for tokens in negative_review_tokens:
        negative_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    all_pos_words = get_all_words(positive_cleaned_tokens_list)

    freq_dist_pos = FreqDist(all_pos_words)

    positive_tokens_for_model = get_reviews_for_model(positive_cleaned_tokens_list)
    negative_tokens_for_model = get_reviews_for_model(negative_cleaned_tokens_list)

    positive_dataset = [(review_dict, "Positive")
                         for review_dict in positive_tokens_for_model]

    negative_dataset = [(review_dict, "Negative")
                         for review_dict in negative_tokens_for_model]

    dataset = positive_dataset + negative_dataset

    random.shuffle(dataset)

    train_data = dataset[:7000]
    test_data = dataset[7000:]

    classifier = NaiveBayesClassifier.train(train_data)

    # Print accuracy
    accuracy = classify.accuracy(classifier, test_data)
    print("Accuracy is:", accuracy)
    
    return classifier

def classify_review(classifier, custom_review):
    custom_tokens = remove_noise(word_tokenize(custom_review))
    classification_result = classifier.classify(dict([token, True] for token in custom_tokens))
    return classification_result

@app.route('/classify', methods=['POST'])
def classify_text():
    try:
        data = request.get_json()
        text = data['text']
        classification_result = classify_review(trained_classifier, text)
        return jsonify({'result': classification_result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    trained_classifier = train_classifier()
    app.run(debug=True)

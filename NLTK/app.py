from flask import Flask, render_template, request
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
from io import BytesIO
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import base64


cred = credentials.Certificate("service.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

collection_ref = db.collection('mood')

app = Flask(__name__)

# Initialize NLTK sentiment analyzer
nltk.download('vader_lexicon')
analyzer = SentimentIntensityAnalyzer()

# Sample mood data (you should have real data)
entries = [
    ("Had a wonderful day at the park with friends!", "happy"),
    ("Feeling a bit down today. It rained all day.", "sad"),
    ("Received good news at work. Happy!", "happy"),
    ("Enjoyed a delicious meal with family.", "happy"),
    ("Had trouble at work today. Feeling stressed.", "sad"),
]

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html', entries=entries)

@app.route('/submit', methods=['POST'])
def submit_entry():
    entry = request.form['entry']
    mood = analyze_sentiment(entry)
    entries.append((entry, mood))
    print(entries)
    return render_template('index.html', entries=entries)

@app.route('/mood_chart')
def mood_chart():
    dates = [entry[0] for entry in entries]
    moods = [entry[1] for entry in entries]
    
    # Create a line chart
    plt.figure(figsize=(10, 5))
    plt.plot(dates, moods, marker='o')
    plt.xticks(rotation=45)
    plt.title("Mood Trend Over Time")
    plt.xlabel("Date")
    plt.ylabel("Mood")
    
    # Save the chart as a base64-encoded image
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    chart_url = base64.b64encode(img.read()).decode()
    
    return render_template('mood_chart.html', chart_url=chart_url)

def analyze_sentiment(text):
    sentiment = analyzer.polarity_scores(text)
    compound_score = sentiment["compound"]
    
    if compound_score >= 0.05:
        data_to_insert = {
            "mood": "very_positive",
        }
        collection_ref.add(data_to_insert)
        return "very_positive"
    elif 0.05 > compound_score > 0.01:
        data_to_insert = {
            "mood": "positive",
        }
        collection_ref.add(data_to_insert)
        return "positive"
    elif -0.01 <= compound_score <= 0.01:
        data_to_insert = {
            "mood": "neutral",
        }
        collection_ref.add(data_to_insert)
        return "neutral"
    elif -0.01 > compound_score > -0.05:
        data_to_insert = {
            "mood": "negative",
        }
        collection_ref.add(data_to_insert)
        return "negative"
    else:
        data_to_insert = {
            "mood": "very_negative",
        }
        collection_ref.add(data_to_insert)
        return "very_negative"
        
if __name__ == '__main__':
    app.run(debug='True',host='127.0.0.1',port='8080')

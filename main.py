from flask import (
    Flask,
    request,
    jsonify,
    send_file
)
from google.cloud import datastore
from datetime.datetime import now

app = Flask(__name__)
datastore_client = datastore.Client()

@app.route("/")
def home():
    return send_file("static/index.html")
    

@app.route("/question", methods=["GET"])
def list_questions():
    q = datastore_client.query(kind="Question")
    q.order("creation_time")
    questions = q.fetch()

    x = [ {"id": i.id, "text": i["text"], "upvotes": i["upvotes"]} for i in questions]
    return jsonify(x)


@app.route("/question", methods=["POST"])
def store_question():
    question_text = request.form.get("question")

    question_key = datastore_client.key("Question")
    question = datastore.Entity(key=question_key)
    question["text"] = question_text
    question["upvotes"] = 0
    question["creation_time"] = now()
    datastore_client.put(question)

    return jsonify(question)


@app.route("/question/<int:question_id>", methods=["PATCH"])
def upvote_question(question_id):
    question_key = datastore_client.key("Question", question_id)
    question = datastore_client.get(question_key)

    question["upvotes"] = question["upvotes"] + int(request.form.get("upvotes"))
    datastore_client.put(question)
    
    return jsonify(question)

    
@app.route("/question/<int:question_id>/comment", methods=["GET"])
def show_comments(question_id):
    question_key = datastore_client.key("Question", question_id)

    q = datastore_client.query(kind="Comment")
    q.add_filter("question_key", "=", question_key)
    q.order("creation_time")
    comments = q.fetch()
    output = [{ "text": x["text"] } for x in comments]

    return jsonify(output)


@app.route("/question/<int:question_id>/comment", methods=["POST"])
def store_comment(question_id):
    comment_text = request.form.get("comment")

    question_key = datastore_client.key("Question", question_id)
    comment_key = datastore_client.key("Comment")
    comment = datastore.Entity(key=comment_key)
    comment["text"] = comment_text
    comment["question_key"] = question_key
    comment["upvotes"] = 0
    comment["creation_time"] = now()
    datastore_client.put(comment)

    return jsonify({ "text": comment["text"] })


@app.route("/question/<int:question_id>/comment/<int:comment_id>", methods=["PATCH"])
def upvote_comment(question_id, comment_id):
    comment_key = datastore_client.key("Comment", comment_id)
    comment = datastore_client.get(comment_key)
    
    comment["upvotes"] = request.form.get("upvotes")
    datastore_client.put(comment)

    return jsonify(comment)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

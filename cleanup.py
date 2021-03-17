from google.cloud import datastore

datastore_client = datastore.Client()

def run():
    q = datastore_client.query(kind="Comment")
    comments = q.fetch()
    datastore_client.delete_multi([c.key for c in comments])

    q = datastore_client.query(kind="Question")
    comments = q.fetch()
    datastore_client.delete_multi([c.key for c in comments])


if __name__ == "__main__":
    run()
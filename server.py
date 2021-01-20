from flask import Flask, render_template, request, Response
import os.path
import re
def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__,static_url_path='', static_folder='webApp')
@app.route('/loadInitData', methods = ['POST'])
def postJsonHandler():
    print("PORCODIO")
    print (request.is_json)
    content = request.get_json()
    print (content)
    return 'JSON posted'
@app.route('/try')
def index():
    content = get_file('webApp/html/try.html')
    return Response(content, mimetype="text/html")


    #GET 1 ARG request.args.get('user')
    return render_template(request.query_string)


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')

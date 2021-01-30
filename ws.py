import asyncio
import datetime
import random
import websockets

async def time(websocket, path):

    print(websocket)
    print(path)

def init(app):
    print("CAIOOOOOOOOOOO")
    start_server = websockets.serve(time, "127.0.0.1", 5678)
    app.run(debug=True, port=8000, host='0.0.0.0')

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    return

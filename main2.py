import json
import socket
import requests

def PostToAPI(recvData):
    url = "https://spozham-rest.azurewebsites.net/api/Broadcasts"
    trackId = recvData

    rr = requests.post(url=url, data=json.dumps(trackId), headers={"Content-Type": "application/json"})

    print(rr.json())


def RecievePodcast():
    IP = ''  # Receive any incoming UDP packet on this port
    PORT = 18000  # Example port
    ADDRESS = (IP, PORT)

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.bind(ADDRESS)

    while True:
        data, address = s.recvfrom(4096)

        print(data)
        if data != "":
            PostToAPI(data.decode('utf-8'))
            break
    print("Received: ", data.decode('utf-8'), "\n")
    PostToAPI(data.decode('utf-8'))



RecievePodcast()



# You can also still send UDP packets from the socket, even if it's bound already.
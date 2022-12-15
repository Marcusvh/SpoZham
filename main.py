import requests
from socket import *
from sense_hat import SenseHat
from time import *
import os

sense = SenseHat()
sense.clear()
def start_recording():
    print("Recording")
    os.popen("sh /home/pi/eksamen/start_recording.sh")

def recognizeSong():
    url = 'https://shazam-core.p.rapidapi.com/v1/tracks/recognize'
    files = {'file': ('out.wav', open('/home/pi/Kirjube/out.wav','rb'), 'audio/wav')}
    headers = {
        "X-RapidAPI-Key": "7d5f825e8cmsh2e6564aa7cd50fcp1a2b19jsn802b5c2088b1",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com"
    }
    response = requests.request('POST', url, files=files, headers=headers)
    dResponse = response.json()
    trackId = dResponse['matches'][0]['id']

    print(trackId)
    return(trackId)
#Function som broadcaster en string. Input er et TrackID.
def broadcastTrackId(trackId):
    serverName = 'localhost'
    serverPort = 18000
    clientSocket = socket(AF_INET, SOCK_DGRAM)
    clientSocket.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

    for x in range(4):
        sleep(5)
        message = trackId
        clientSocket.sendto(message.encode(), ('<broadcast>', serverPort))

    clientSocket.close()

#while-løkke: Hvis der trykkes ned på joysticket tricker den, og printer en bekræftigelse på$
while True:
    # Opsættelse af broadcast
    serverName = 'localhost'
    serverPort = 18000
    clientSocket = socket(AF_INET, SOCK_DGRAM)
    clientSocket.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

    for event in sense.stick.get_events():
    # Tjekker hvis joysticket er trykket ned
        if event.action == "pressed":

            if event.direction == "middle":
                try:
                    sense.show_message("Aflytning startet, vent", text_colour=(255,0,0),scroll_speed=0.05)
                    start_recording()
                    sleep(5)
                    track = str(recognizeSong())
                    broadcastTrackId(track)

                    sense.show_message("Aflytning afsluttet, tjek SpoZham", text_colour=(255,0,0), scroll_speed=0.05)
                except:
                    sense.show_message("Der gik noget galt. Proev igen.")



      # Venter før den clearer displayet.
        sleep(0.5)
        sense.clear()
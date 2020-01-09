import React from "react";
import "./style.css";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import RoomList from "./RoomList";
import NewRoomForm from "./NewRoomForm";

import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";

// NR 1 -> skickar information neråt tll barnet (MessageList)

/*
State är privat för en komonent
State är det ända sättet du kan ändra på ett värde(ej props).
Props är inte privat och delas mellan komponenter
*/

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  /* Chat manager API */

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Mimmi Pigg",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    /*  
    chatManager.connect() returnerar ett promise 
    -> När promiset är löst så får vi access till currentUser...
    
    Med denna funktion som  vi kommunicerar emd chatKit APIet
    */

    chatManager
      .connect()
      .then(currentUser => {
        // Tar användaren och binder den till komponenten
        // Tack vare det så kan vi gå och använda den i sendMessage funktionen.
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });

    /* 
    Skriver ut meddelandet i varje rum.
    Sparar det i denna komponent och skickar in den i MessagesList komponenten
    
    */
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            /* 
            Med setState kan vi ändra värdet på messages
            Skapar en helt ny array/en kopia med de senaste meddelandena tillagda
             */
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  sendMessage(text) {
    /*
    Detta är bara möjligt eftersom vi gjorde detta: this.currentUser = currentUser
    i chatManager.connect()
    */
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("error with createRoom: ", err));
  }

  render() {
    return (
      <div className="app">
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          roomId={this.state.roomId}
        />
        <MessageList
          /* 
        Tar informatione från denna komponent och skickar viadre till MessageList komonenten 
        med hjälp av props. 
        messages och roomId är props.
        Här skickar vi infomartion neråt med hjälp av props.

        Varje gång ett nytt meddelande kommer in så triggas en ny re render på MessageList.
        */
          roomId={this.state.roomId}
          messages={this.state.messages}
        />

        {/* 
            Omvänt data flöde, 
            skicka data från barn till vuxen för att trigga en metod.

            Vi skickar in disable & sendMessage som props till child komponenten för 
            att 
       */}

        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default Chat;

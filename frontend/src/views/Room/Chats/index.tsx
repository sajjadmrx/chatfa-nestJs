import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Message } from "@interfaces/schemas/message.interface"
import { IoSendSharp } from "react-icons/io5"
// import { IconComponent } from "components/Shared"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Textarea } from "react-daisyui"
import { AiOutlineUser } from "react-icons/ai"
import { BsEmojiSmile } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../context/auth/AuthProvider"
import { SocketContext, socketContext } from "../../../context/socket/socketContext"
import { socket } from "../../../hooks/useSocket"
import { fetchMessages } from "../../../services/message.service"
import DropdownMenu from "./DropdownMenu"
interface Prop {
  setShowMembers: any
}
const messagesStore = new Map<string, Message>()

const ChatsComponent = ({ setShowMembers }: Prop) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useContext<SocketContext>(socketContext)
  const [showPicker, setShowPicker] = useState(false)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const { user } = useAuth()
  const params = useParams()
  const scrollRef = useRef<any>()

  useEffect(() => {
    socket.on("CREATE_MESSAGE", (message: Message) => {
      if (message.roomId == Number(params.id)) {
        setMessages((prevMessages) => [...prevMessages, message])
        messagesStore.set(message.id, message)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight // todo bug
      }
    })
    return () => {
      socket.off("CREATE_MESSAGE")
    }
  }, [socket])

  useEffect(() => {
    fetchMessages(Number(params.id), 1).then((resp) => setMessages(resp.data.reverse()))
  }, [])

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native)
  }

  const sendMsg = () => {
    socket.emit("CREATE_MESSAGE", {
      content: message,
      replyId: null,
      roomId: Number(params.id),
    })
    setMessage("")
  }

  return (
    <section className="w-11/12 h-full px-6 py-5 m-auto border-2 lg:border-l border-slate-100 sm:w-3/5 lg:w-80 xl:w-96">
      <div className="flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Chat</h2>
          <AiOutlineUser
            onClick={() => setShowMembers(true)}
            className="lg:hidden"
            size={24}
          />
        </div>
      </div>
      {/* @ts-ignore*/}
      <div className="space-y-5 h-[calc(100%-129px)] overflow-y-auto" ref={scrollRef}>
        {messages.map((item, index) => (
          <div key={index} className="mr-2">
            <div className="flex">
              <img
                className="border border-gray-200 rounded-full w-9"
                src="/assets/images/avatar.jpg"
                alt={"avatar"}
              />
              <div className="flex items-center justify-between w-full">
                <h4 className="ml-3 ">
                  {item.authorId == user?.userId}{" "}
                  {item.author?.nickname || item.author.user.username}
                </h4>
                <DropdownMenu />
              </div>
            </div>

            <div
              className="px-4 py-2 ml-12 text-sm bg-gray-100 border rounded-tl-none rounded-2xl"
              style={{ wordBreak: "break-word" }}
            >
              {item.content}
              <div className="mt-1 text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-12 mt-5 overflow-hidden border rounded-full">
        <div
          className="relative flex items-center justify-center w-full h-full"
          dir={"auto"}
        >
          <Textarea
            dir={"auto"}
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full !pt-3 pl-4 text-sm bg-white rounded-full focus:outline-none focus:border-gray-500 "
            onClick={() => setShowPicker(false)}
          />
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="absolute z-10 -translate-y-1/2 top-1/2 right-10"
          >
            <span role="img" aria-label="smiley-face">
              <BsEmojiSmile />
            </span>
          </button>
          <button
            className="absolute z-10 -translate-y-1/2 top-1/2 right-2"
            onClick={sendMsg}
          >
            {/* <IconComponent name="send" color="blue" size={22} /> */}
            <IoSendSharp className={"text-primary text-xl"} />
          </button>
        </div>
        <div className="absolute" style={{ bottom: 83, right: 26 }} hidden={!showPicker}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      </div>
    </section>
  )
}

export default ChatsComponent

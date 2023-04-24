import Layout from "@/components/Layout"
import MainPage from "@/components/MainPage"
import { Button, Icon } from "@/components/Shared"

import { VscLock, VscUnlock } from "react-icons/vsc"
import { HiOutlineUserGroup } from "react-icons/hi"

const data = [
  {
    id: "6442bebb67d69647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442bebqb6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442beb6b6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: false,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442bebb67693647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "64452bebb6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: false,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442b9ebb6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: false,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "64423bebb6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442bebb67696647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: false,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442hbebb6769647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
  {
    id: "6442bebb676dc9647618f4cc5c",
    roomId: 32255782,
    ownerId: 173796573357,
    name: "Sua Smythe",
    isPublic: true,
    avatar: "DEFAULT_AVATAR",
  },
]

const IndexPage = () => {
  return (
    <Layout>
      <div className="bg-[#f8f7fa]">
        <nav className="flex items-center justify-between bg-white shadow-sm py-3 px-4">
          <Button variant="secondary">New Room</Button>
          <img
            className="w-16 rounded-full border-4 border-gray-200"
            src="https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg"
          />
        </nav>
        <section className="grid grid-cols-3 gap-5 p-5 min-h-screen">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white w-full rounded-3xl px-7 py-7 shadow-sm"
            >
              <div className="flex items-start">
                <img
                  className="w-20 rounded-full border-[6px] border-gray-200"
                  src="https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg"
                />
                <div className="ml-2 mt-4">
                  <h4 className="font-semibold flex gap-1">
                    {item.isPublic ? (
                      <VscUnlock className={""} />
                    ) : (
                      <VscLock className={""} />
                    )}
                    {item.name}
                  </h4>

                  <div className="mt-2 flex items-center space-x-3 text-[#60637B]">
                    <div className="text-sm flex">
                      <HiOutlineUserGroup
                        name="user"
                        size={16}
                        color="gray"
                        className="mr-1"
                      />
                      <span className="leading-[23px]"> 01/10 </span>
                    </div>
                    <div>
                      <div className="flex">
                        <Icon
                          name="radar"
                          size={18}
                          className="mr-1 animate-pulse  delay-75"
                        />
                        <span className="text-sm leading-[23px]">
                          Played Battlefield V
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    className="mt-2"
                    rounded="full"
                    disabled={!item.isPublic}
                  >
                    Join to room
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}
export default IndexPage

import React from 'react'
import SimpleBar from 'simplebar-react'
import { CreatePost, ImagePost } from '@/features/feed/components'
import { faker } from '@faker-js/faker'

const mockPosts = Array.from({ length: 55 }).map(() => {
  const width = faker.number.int({ min: 400, max: 700 })
  const height = faker.number.int({ min: 250, max: 600 })
  return {
    user: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
    },
    date: faker.date.recent().toLocaleDateString('pt-BR'),
    text: faker.lorem.sentence(),
    imageUrl: faker.image.urlPicsumPhotos({ width, height }),
    likes: faker.number.int({ min: 0, max: 1000 }),
    comments: faker.number.int({ min: 0, max: 300 }),
    shares: faker.number.int({ min: 0, max: 50 }),
  }
})

const Feed: React.FC = () => {
  return (
    <SimpleBar className="h-screen w-full">
      <div className="flex justify-center gap-6 p-6 w-full">
        <div className="w-[630px] flex-shrink-0">
          <div className="space-y-4 gap-2 flex flex-col">
            <CreatePost />
            {mockPosts.map((post, idx) => (
              <ImagePost key={idx} {...post} />
            ))}
          </div>
        </div>

        <div className="w-[320px] ml-[70px] flex-shrink-0">
          <h3 className="text-base font-semibold ">Patrocinado</h3>
        </div>
      </div>
    </SimpleBar>
  )
}

export default Feed

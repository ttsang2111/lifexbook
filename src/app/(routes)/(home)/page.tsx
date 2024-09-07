import BookList from "@/components/books-list";
import { db } from "@/lib/db";


export default async function Home() {
  const books = await db.book.findMany({
    where: {
      isPublished: true
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        select: {
          id: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <>
      <div className="p-6">
        <BookList items={books} />
      </div>
    </>
  )
}

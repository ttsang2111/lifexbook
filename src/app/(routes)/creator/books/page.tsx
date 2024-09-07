import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"

import { db } from "@/lib/db";

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"


export default async function BookPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const books = await db.book.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    
    return (
        <div className="container mx-auto p-10">
            <DataTable columns={columns} data={books} />
        </div>
    )
}

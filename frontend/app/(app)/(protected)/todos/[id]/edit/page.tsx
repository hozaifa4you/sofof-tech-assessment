import { notFound } from "next/navigation";
import { TodoHeader } from "@/components/app/header";
import { EditTodoForm } from "@/components/app/todos/edit-todo-form";
import { fetchWithAuth } from "@/lib/authFetch";

const EditTodoPage = async ({
   params,
}: {
   params: Promise<{ id: number }>;
}) => {
   const { id } = await params;

   const res = await fetchWithAuth(`/api/v1/todos/${id}`);
   const todo = await res.json();
   if (!res.ok) {
      if (res.status === 404) {
         return notFound();
      }
      throw new Error("Failed to fetch todo");
   }

   return (
      <div className="h-full rounded-xl border p-4">
         <TodoHeader title="Edit Todo" />
         <div className="mx-auto max-w-3xl">
            <EditTodoForm todo={todo} />
         </div>
      </div>
   );
};

export default EditTodoPage;

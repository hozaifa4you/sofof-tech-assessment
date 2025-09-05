const TodosPage = () => {
   return (
      <div className="h-full rounded-xl border p-4">
         <div>
            <h1>Upcoming</h1>
         </div>
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">1/1</div>
            <div>1/2</div>
            <div>1/3</div>
         </div>
      </div>
   );
};

export default TodosPage;

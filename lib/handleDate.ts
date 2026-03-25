export const handleDate=(date:Date)=>{
    const newDate= new Date(date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year:"2-digit"
    })
    return newDate
}
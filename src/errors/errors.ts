export function conflictError(entity: string){
    return {
        type:"conflict",
        message:`${entity} já existe!`
    }
}

export function notFound(entity: string){
    return{
        type:"notFound",
        message:`${entity} não existe!`
    }
}

export function unprocessableEntity(){
    return{
        type:"UnprocessableEntity",
        message:"não é possível processar esse tipo de dado!"
    }
}

export function badRequest(){
    return{
        type: "badRequest",
        message: "esta operação não pode ser realizada!"
    }
}

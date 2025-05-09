export function conflictError(entity: string){
    return {
        type:"conflict",
        message:`${entity} já existe!`
    }
}

export function notFound(){
    return{
        type:"notFound",
        message:`não encontrado!`
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

export function unauthorized(){
    return{
        type: "Unauthorized",
        message: "email e/ou senha inválido(s)!"
    }
}

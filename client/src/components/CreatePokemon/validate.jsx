export function validate(input) {
    let errors = {};
    
    if(!input.name) {
        errors.name = "Name is required"
    }

    if(!/^[a-zA-Z\s]*$/.test(input.name))
        errors.name = "Invalid name. Only Letters";
    
    if(input.hp < 1 || input.hp > 100 || !input.hp) {
        errors.hp = "Hp is out of range" ; 
    }

    if(input.attack < 1 || input.attack > 100 || ! input.attack){
        errors.attack = "Attack is out of range" ; 
    }

      
    if(input.defense < 1 || input.defense > 100 || !input.defense) {
        errors.defense = "Defense is out of range" ; 
    }

      
    if(input.speed < 1 || input.speed > 100 || !input.speed) {
        errors.speed = "Hp is out of range" ; 
    }

      
    if(input.height < 1 || input.height > 100 || !input.height) {
        errors.height = "Height is out of range" ; 
    }

      
    if(input.weight < 1 || input.weight > 100 || !input.weight) {
        errors.weight = "Weight is out of range" ; 
    }

    if(!input.type.length) errors.type = "At least one type is required" ; 
    if(input.type.length > 2) errors.type = "Your pokemon can´t get more than two types";

    return errors
}
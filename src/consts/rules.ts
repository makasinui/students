export const rules = (name: string, ruleValue: number = 0): string | boolean => {
    return {
        'required': (value: string) => !!value || "Поле обязательно",
        'min': (value: string) => value?.length >= ruleValue || "Минимальное кол-во символов: " + ruleValue,
        'date': (value: any) => {
            const regexp = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
            
            return regexp.test(value) || "Поле должно быть в виде даты"  
        } 
    }[name]
}
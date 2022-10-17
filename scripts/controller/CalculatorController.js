class CalculatorController{
    _locale = 'pt-BR';
    _operation = [];

    constructor(){
        this._display = document.querySelector('#display');
        this._date = document.querySelector('#data');
        this._time = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initializeButtonsEvents();
    }

    initialize(){
        this.displayDateTime();
        setInterval(()=>{
            this.displayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, func){
        events.split(' ').forEach(event => {
            element.addEventListener(event, func, false);
        });
    }

    lastOperation(){
        return this._operation[this._operation.length - 1];
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    isOperator(value){
        if(['+', '-', '*', '/', '%'].indexOf(value) > -1){
            return true;
        }
        return false;
    }

    addOperation(value){
        if(isNaN(this.lastOperation())){
            if(this.isOperator(value)){
                this._operation[this._operation.length - 1] = value;
            } else{

            }
        } else{
            const newValue = `${this.lastOperation()}${value}`;
            this._operation.push(newValue);
        }

        console.log(this._operation)
    }

    setError(){
        this.displayCalculator = "Error";
    }

    executeButton(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.clearEntry();
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(Number(value));
                break;
            default:
                this.setError();
        }
    }

    initializeButtonsEvents(){
        const buttons = document.querySelectorAll('#buttons > g, #parts > g');

        for(const button of buttons){
            this.addEventListenerAll(button, 'click drag', ()=>{
                const [_, content] = button.className.baseVal.split('-');
                
                this.executeButton(content);
            });

            this.addEventListenerAll(button, 'mouseover', ()=>{
                button.style.cursor = 'pointer';
            })
        }
    }

    displayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalculator(){
        return this._displayCalculator;
    }

    set displayCalculator(value){
        this._displayCalculator = value;
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this._currentDate = value;
    }

    get displayTime(){
        return this._time.innerHTML;
    }

    set displayTime(value){
        this._time.innerHTML = value;
    }

    get displayDate(){
        return this._date.innerHTML;
    }

    set displayDate(value){
        this._date.innerHTML = value;
    }
}
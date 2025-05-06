import { onBeforeUnmount, onMounted } from 'vue'


export default function useDetectOutsideClick(component=null,excludedClasses=null,callback) {


    if (component===null && excludedClasses===null) return;
        const listener = (event) => {
            let clickedComponent=false;
            let clickedClasses=false;
            if (component!==null) {
                clickedComponent = isComponentFound(component,event);
            }

            if (excludedClasses!==null){

                clickedClasses = isClassFound(excludedClasses,event);
            }



            if (clickedComponent===false && clickedClasses===false) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
        onMounted(() => { window.addEventListener('click', listener) })
        onBeforeUnmount(() => { window.removeEventListener('click', listener) })

        return { listener }

}


const isComponentFound=(component,event)=>{

    for (let i=0;i<component.length;i++){
        if (component[i].value && component[i].value.contains(event.target)){
            return true;
        }
    }
    return false;
}

const isClassFound=(className,event)=>{

    for (let i=0;i<className.length;i++){
       // console.log('checking className',className);

        if (event.target.closest("." + className[i]) !== null){
            return true;
        }

    }
    return false;
}
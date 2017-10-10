<template>
    <div class="wrapper">
        <label><slot></slot></label> 
        <br>
        <input type="text"
               v-for="string in readableArray"
               :value="string"
               disabled>
    </div>
</template>

<script>
    export default {
        props: ['value', 'numProps'],
        computed: {
            readableArray: function() {
                var outArray = []
                for (var index in this.value) {
                    var outString = ''
                    var obj = this.value[index]
                    for (let j = 0; j < this.numProps; j++) {
                        outString += String(obj[Object.keys(obj)[j]]) + ' ' 
                        console.log(obj[Object.keys(obj)[j]])
                    }
                    outArray.push(outString)
                }
                return outArray
            }
        }
    }
    
</script>


<style scoped>
.wrapper {
    border-radius: 4px;
    box-shadow: 0px 1px 4px 0px #888;
    box-sizing: border-box;
    /* margin: top, right, bottom, left */
    margin: 4px 1px 4px 1px;
    background-color: #F8F8F8;
}
label {
    font-size: 8pt;
    color: #000000;
    opacity: 0.54;
    /* padding: top, right, bottom, left */
    padding: 4px 0px 0px 6px;
    display: inline-block;
}
input {
    font-size: 12pt;
    color: #000000;
    opacity: 0.87;
    background-color: transparent;
    border: none;
    padding: 1px 0px 4px 14px;
}
</style>

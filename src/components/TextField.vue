<template>
    <!--MUST PASS STRINGS OR NUMBERS TO VALUE PROP-->
    <div class="wrapper">
        <label><slot></slot></label> 
        <br>
        <!--was originally trying input, but I think span is better-->
        <!--<input type="text"-->
             <!--:value="value"-->
             <!--v-if="value">-->
                      <!--[> [>fallback to display none if empty<] <]-->
          <!--<input type="text"-->
                 <!--:value="'None'"-->
                 <!--v-else>       -->
       <!--span allows words to wrap, so more resilient to weird configurations than input-->
        <span v-if="value">{{value}}</span> 
        <span v-else>None</span> 
    </div>
</template>

<script>
    export default {
        props: ['value']
    }
    
</script>


<style scoped>
.wrapper {
    border-radius: 4px;
    /*box-shadow: h-shadow, v-shadow, blur, spread, color*/
    box-shadow: 0px 1px 4px 0px #888;
    box-sizing: border-box;
    /* margin: top, right, bottom, left */
    margin: 4px 1px 4px 1px;
    background-color: white;
}
label {
    font-size: 9pt;
    color: #000000;
    opacity: 0.54;
    /* padding: top, right, bottom, left */
    padding: 4px 6px 0px 6px;
    /* negative margin to bottom because display: block implies large margin*/
    margin-bottom: -20px;
    /*must have block for break-word to work*/
    display: block;
    word-wrap: break-word;
}
/*not using input now, but was previously, copied these styles for span*/
input {
    font-size: 12pt;
    color: #000000;
    opacity: 0.87;
    background-color: transparent;
    border: none;
    padding: 1px 14px 4px 14px;
}
span {
    font-size: 12pt;
    color: #000000;
    opacity: 0.87;
    background-color: transparent;
    border: none;
    padding: 1px 14px 4px 14px;
    /* again, need block for break-word to work*/
    display: block;
    word-wrap: break-word;
}
</style>

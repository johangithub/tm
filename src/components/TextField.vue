<template>
    <div class="wrapper">
        <label><slot></slot></label> 
        <br>
        <input type="text"
               :value="value"
               disabled>
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
    box-shadow: 0px 1px 4px 0px #888;
    box-sizing: border-box;
    margin: 4px 1px 4px 1px;
    background-color: #F8F8F8;
}
label {
    font-size: 8pt;
    color: dimgray;
    padding: 0px 0px 0px 6px;
}
input {
    font-size: 12pt;
    background-color: transparent;
    border: none;
    padding: 1px 0px 4px 14px;
}
</style>

<template>
    <!--ONLY WORKS WITH ARRAYS PASSED TO VALUE PROP-->
    <div class="wrapper">
        <!--label gets default slot (any text not in slot tags but in child component instantiation goes here)-->
        <!--stuff in names slot text goes here-->
        <label><slot></slot></label>
        <br>
        <slot name="text" 
              v-for="element in value" 
              :item="element">
        </slot>
        <!--fallback to display none if empty array-->
        <slot name="fallback" v-if="value.length === 0">
            <span>None</span>
        </slot>
        <!--create table for showing block codes, courses, any iterables that need to have column headers and good spacing (use text slot if headers/good spacing not needed)-->
        <table v-if="table && value.length !== 0">
            <thead>
                <tr>
                    <th v-for="header in headers">{{header}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="element in value">
                    <slot name="row"
                          :item="element">
                    </slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['value', 'table', 'headers']
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
    font-size: 9pt;
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
span {
    font-size: 12pt;
    color: #000000;
    opacity: 0.87;
    background-color: transparent;
    border: none;
    padding: 1px 0px 4px 14px;
    display: inline-block;
}
table {
    padding: 8px 8px 4px 8px;
    table-layout: fixed;
}
th {
    font-size: 10pt;
    color: #000000;
    opacity: 0.80;
    padding: 0px 15px 0px 15px;
    word-wrap: break-word;
}
td {
    font-size: 12pt;
    color: #000000;
    opacity: 0.87;
    padding: 0px 15px 4px 15px;
    word-wrap: break-word;
}
</style>

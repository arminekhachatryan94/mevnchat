<template>
    <nav class="text-white row col-md-12">
        <span class="col-md-6 text-left">
            <a id="title" href="/#/">iChat</a>
        </span>
        <div class="col-md-6 text-right">
            <a class="align-middle" href="/#/register">Register</a>
            <router-link :to="{ name: 'Login' }" class="align-middle">Login</router-link>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
nav{
    background-color: rgb(145, 204, 105);
    width: 100%;
}
a{
    color: white;
    font-size: 20px;
    padding: 5px;
}
#title {
    font-size: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
#height {
    height: 100px;
}
</style>

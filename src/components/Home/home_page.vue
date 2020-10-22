<template>
    <div class="home_page_wrapper">
        <div class="header">
            <div class="logo">
                <tw_logo class="tw-logo" height="72px"></tw_logo>
            </div>
            <div class="to-weather-button" @click="writeFile('some_text')"></div>
        </div>
    </div>
</template>

<script>
    import tw_logo from "../../assets/logos/tw_logo";

    export default {
        name: "home_page",
        components: {
            tw_logo
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
    .home_page_wrapper{
        .header{
            padding: 16px 64px;
            .logo{
                .tw-logo{

                }
            }
            .to-weather-button{
                height: 48px;
                width: 48px;
                background: rgba(64, 202, 74, 1);
            }
        }
    }
</style>
<template>
    <div class="side-bar">
        <div class="title">{{activeName}}</div>
        <div class="choose">
            <router-link to="/home" :class="{'active': activeName=='home'}"><span>home</span></router-link>
            <router-link to="/profile" :class="{'active': activeName=='profile'}"><span>profile</span></router-link>
            <router-link to="/chat" :class="{'active': activeName=='chat'}"><span>chat</span></router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['activeName'],
    data() {
        return {
            
        };
    }
};
</script>

<style lang="less" scoped>
.side-bar {
    width: 40%;
}

.title {
    width: 100%;
    font-size: 4vmin;
    line-height: 10vmin;
    font-weight: 600;
    text-align: left;
    text-indent: 5vmin;
}

.acrive-color(@bgcolor: #f2f0fa, @fontcolor: #a9a4be, @shadowcolor: #d3d2d6) {
    background-color: @bgcolor;
    color: @fontcolor;
    box-shadow: 0px 1px 18px @shadowcolor;
}

.choose {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
        display: block;
        width: 60%;
        height: 7vmin;
        color: #a9a4be;
        background: #f2f0fa;
        position: relative;
        margin-top: 10vmin;
        font-size: 3vmin;
        line-height: 7vmin;
        transition-property: background,color,box-shadow;
        transition-duration: .7s;

        span {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            color: #a9a4be;
            background: #f2f0fa;
            z-index: 10;
        }

        &.active {
            .acrive-color();
        }
        &.active::before, &.active::after {
            box-shadow: 0px 0px 2px #e1e0e4;
        }

        &:hover {
            .acrive-color();
        }

        &:hover::before, &:hover::after {
            box-shadow: 0px 0px 4px #e1e0e4;
        }
        
        &::before {
            content: "";
            position: absolute;
            height: 7vmin;
            width: 7vmin;
            left: 0;
            background-color: inherit;
            transform: translateX(-15%);
            border-radius: 15%;
            z-index: 0;
            transition: all .7s;
        }

        &::after {
            content: "";
            position: absolute;
            height: 7vmin;
            width: 7vmin;
            right: 0;
            background-color: inherit;
            transform: translateX(15%);
            border-radius: 15%;
            z-index: 0;
            transition: all .7s;
        }
    }
}
</style>
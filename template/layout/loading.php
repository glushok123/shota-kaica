<div class="block-spinner hidden">
    <span class="loader"></span>
    <div class="row text-center text-white loader-text">
        <h1>Ожидайте</h1>
    </div>
</div>

<style>
    .loader-text{
        position: absolute;
        top:53%;
        left:45%;
    }
    .block-spinner{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(11,13,88,0.64);
    }
    .loader {
        position: absolute;
        width: 85px;
        height: 50px;
        top:45%;
        left:47%;
        background-repeat: no-repeat;
        background-image: linear-gradient(#FFF 50px, transparent 0),
        linear-gradient(#FFF 50px, transparent 0),
        linear-gradient(#FFF 50px, transparent 0),
        linear-gradient(#FFF 50px, transparent 0),
        linear-gradient(#FFF 50px, transparent 0),
        linear-gradient(#FFF 50px, transparent 0);
        background-position: 0px center, 15px center, 30px center, 45px center, 60px center, 75px center, 90px center;
        animation: rikSpikeRoll 0.65s linear infinite alternate;
    }
    @keyframes rikSpikeRoll {
        0% { background-size: 10px 3px;}
        16% { background-size: 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px, 10px 3px}
        33% { background-size: 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px}
        50% { background-size: 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px}
        66% { background-size: 10px 3px, 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px}
        83% { background-size: 10px 3px, 10px 3px,  10px 10px, 10px 30px, 10px 50px, 10px 3px}
        100% { background-size: 10px 3px, 10px 3px, 10px 3px,  10px 10px, 10px 30px, 10px 50px}
    }

</style>
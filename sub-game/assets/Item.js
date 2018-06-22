cc.Class({
    extends: cc.Component,

    properties: {
        rankLbl: {
            default: null,
            type: cc.Label
        },
        nameLbl: {
            default: null,
            type: cc.Label
        },
        scoreLbl: {
            default: null,
            type: cc.Label
        },
        avatarImgView: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touched', function() {
            console.log('Item ' + this.itemID + ' clicked');
        }, this);
    },

    updateItem: function(rank, name, score, avatar) {
        this.rankLbl.string = rank;
        this.nameLbl.string = name;
        this.scoreLbl.string = score;
        // this.avatarImgView. = rank;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

"use strict";
cc._RF.push(module, '1d5e1qmI1JHGbog57ACXkRm', 'Star');
// scripts/Star.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.node.onContact = false;
    },
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.node.onContact = true;
        console.log('contact' + Global.bounceCount);

        if (otherCollider.tag >= 10) {
            Global.bounceCount++;
            if (selfCollider.tag == 5) {
                //地球撞击
                wx.vibrateShort();
            }
        }
    }
});

cc._RF.pop();
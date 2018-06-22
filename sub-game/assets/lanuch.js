
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        backView: {
            default: null,
            type: cc.Node
        },
    },

    start () {
        wx.onMessage(data => {
            console.log(data);
            switch (data.message) {
                case 'Show':
                    this.fetchFriendData();
                    console.log("show");
                    break;
                case 'Submit':
                    var highScore = data.score;
                    this.submitScore(highScore);
                    break;
            }
        });
        this.fetchFriendData()
    },

    _show () {
        
        // let moveTo = cc.moveTo(0.5, 0, 0);
        // this.scrollView.runAction(moveTo);

        this.content = this.scrollView.content;
        this.items = []; // 存储实际创建的项数组
        this.dataArray = [234,4324,234,234,4423,123,5634,75,3,23];
        this.lastContentPosY = 0; 
        this.initialize();
        
        // this.updateTimer = 0;  
        // this.updateInterval = 0.2;
        // // 使用这个变量来判断滚动操作是向上还是向下
        // // 设定缓冲矩形的大小为实际创建项的高度累加，当某项超出缓冲矩形时，则更新该项的显示内容
        // this.bufferZone = this.spawnCount * (this.itemTemplate.height + this.spacing) / 2;
    },

    // _hide () {
    //     let moveTo = cc.moveTo(0.5, 0, 1000);
    //     this.display.runAction(moveTo);
    // },

    initialize: function () {
        // 获取整个列表的高度
        // this.backView.size.height = 800
        // this.backView.size.width = 300
        this.content.height = this.dataArray.length * this.itemTemplate.height;
        console.log(this.content)
        console.log(this.content.height)
        for (let i = 0; i < this.dataArray.length; ++i) {
            let data = this.dataArray[i]
            let item = cc.instantiate(this.itemTemplate);
            console.log(item)
            this.content.addChild(item);
    		item.setPosition(0, ((5 - i) - 0.5) * this.itemTemplate.height);
            item.getComponent('Item').updateItem(data, data, data, data);
            this.items.push(item);
            console.log(this.itemTemplate.height)
    	}
    },

    fetchFriendData()
    {
        //取出所有好友数据
        wx.getFriendCloudStorage({
            keyList:[
                "HighScore",
            ],
            success:res => {
                console.log("wx.getFriendCloudStorage success", res);
                this._show();
            },
            fail:res => {
                console.log("wx.getFriendCloudStorage fail", res);
            },
        });
    },
    submitScore(score) { //提交得分
        wx.setUserCloudStorage({
            KVDataList: [{key: "HighScore", value: "" + score}],
            success: function (res) {
                console.log('setUserCloudStorage', 'success', res)
            },
            fail: function (res) {
                console.log('setUserCloudStorage', 'fail')
            },
            complete: function (res) {
                console.log('setUserCloudStorage', 'ok')
            }
        });
    },
    // update: function(dt) {
    //     this.updateTimer += dt;
    //     if (this.updateTimer < this.updateInterval) {
    //         return; // we don't need to do the math every frame
    //     }
    //     this.updateTimer = 0;
    //     let items = this.items;
    //     // 如果当前content的y坐标小于上次记录值，则代表往下滚动，否则往上。
    //     let isDown = this.scrollView.content.y < this.lastContentPosY;
    //     // 实际创建项占了多高（即它们的高度累加）
    //     let offset = this.itemTemplate.height * items.length;
    //     let newY = 0;

    //     // 遍历数组，更新item的位置和显示
    //     for (let i = 0; i < items.length; ++i) {
    //         let viewPos = this.getPositionInView(items[i]);
    //         if (isDown) {
    //             // 提前计算出该item的新的y坐标
    //             newY = items[i].y + offset;
    //             // 如果往下滚动时item已经超出缓冲矩形，且newY未超出content上边界，
    //             // 则更新item的坐标（即上移了一个offset的位置），同时更新item的显示内容
    //             if (viewPos.y < -this.bufferZone && newY < 0) {
    //                 items[i].setPositionY(newY);
    //                 let item = items[i].getComponent('Item');
    //                 let itemId = item.itemID - items.length; // update item id
    //                 item.updateItem(i, itemId);
    //             }
    //         } else {
    //             // 提前计算出该item的新的y坐标
    //             newY = items[i].y - offset;
    //             // 如果往上滚动时item已经超出缓冲矩形，且newY未超出content下边界，
    //             // 则更新item的坐标（即下移了一个offset的位置），同时更新item的显示内容
    //             if (viewPos.y > this.bufferZone && newY > -this.content.height) {
    //                 items[i].setPositionY(newY);
    //                 let item = items[i].getComponent('Item');
    //                 let itemId = item.itemID + items.length;
    //                 item.updateItem(i, itemId);
    //             }
    //         }
    //     }

    //     // // 更新lastContentPosY和总项数显示
    //     // this.lastContentPosY = this.scrollView.content.y;
    //     // this.lblTotalItems.string = "Total Items: " + this.totalCount;
    // },
});

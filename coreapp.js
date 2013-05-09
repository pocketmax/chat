Ext.application({
    name: 'Chat',
    autoCreateViewport: false,
    launch: function() {
        Chat.socket = io.connect('http://' + location.hostname + ':81');
        Chat.socket.on('news', function(msg) {
            var room = Ext.getCmp('room');
            var message = msg.data;
            if(!room.html){
                room.html='';
            }
            room.update(room.html + message + '<br>');
        });

        Ext.create('Ext.window.Window', {
            title: 'socket.io chat',
            height: 300,
            width: 500,
            layout: 'fit',
            closable: false,
            items: {
                xtype: 'box',
                id: 'room',
                html: 'Chat goes here..'
            },
            fbar: [{
                    xtype: 'textfield',
                    width: 470,
                    emptyText: 'Type here and hit enter',
                    enableKeyEvents: true,
                    listeners: {
                        specialkey: function(t, e, eopts) {
                            if (e.getKey() == Ext.EventObject.ENTER) {
                                
                                var room = Ext.getCmp('room');
                                var message = t.getValue();
                                if(!room.html){
                                    room.html='';
                                }
                                room.update(room.html + message + '<br>');

                                Chat.socket.emit('news', { data: message });
                                t.setValue();                                
                            }
                        }
                    }
                }]
        }).show();
    }
});


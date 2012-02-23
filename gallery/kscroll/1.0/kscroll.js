/**
 * ���������
 */
KISSY.add("gallery/kscroll/1.0/kscroll",function(S, Node){
	var $ = Node.all,
        DOT = ".",
        //����
        toPositive = function(n){
            return n<0?(~n+1):n;
        },
        toNegative = function(n){
            return ~n+1;
        };

    /**
     * Scroll������
     * @param container ����
     * @param config ����
     */
    function Scroll(container, config) {
        Scroll.superclass.constructor.apply(this, arguments);
        this._init(container,config);
    }

	//����
    Scroll.ATTRS = {
        prefix:{
            value:"ks-",
            validator: function(v){
                return /^\S+$/.test(v);
            }
        },
        arrow:{
            value:true,
            validator: function(v){
                return (v===true || v===false);
            }
        },
        duration:{
            value:0.1,
            validator: function(v){
                return (S.isNumber(v) && !isNaN(v));
            }
        },
        easing:{
            value:"easeNone"
        },
        container: {},
        body: {},
        track:{},
        drag:{},
        arrowUp:{},
        arrowDown:{},
        extent:{
            value:10,
            setter: function(v){
                if(v<20)v=20;
                return v;
            }
        }
    }
	
	S.extend(Scroll, S.Base, {
        //��ʼ��Scroll
        _init:function(container,config){
            var self = this,
                cfg = config || {};

            //�ж������Ƿ���ȷ
            container = $(container);
            if(!container[0]){
                S.log("��������ȷ������");
                return;
            }
            
            //��������
            this.set("prefix",cfg.prefix);
            this.set("arrow",cfg.arrow);

            //�Ƿ��Զ�wrap
            if(!container.parent().hasClass(cfg.prefix+"ScrollContainer")){
                container = self._wrap(container);
            }

            //��ʼ��UI����
            this.set("container",container);
            this.set("body",container.one(DOT+this.get("prefix")+"body"));
            this.set("track",container.one(DOT+this.get("prefix")+"track"));
            this.set("drag",this.get("track").one(DOT+this.get("prefix")+"drag"));
            this.set("arrowUp",container.one(DOT+this.get("prefix")+"arrowup"));
            this.set("arrowDown",container.one(DOT+this.get("prefix")+"arrowdown"));

            //�󶨸����¼�
            this._bindEvt();

            //��ʼ���ߴ�
            this.setSize();

        },

        //����panel
        _wrap: function(container){
            var self = this,
                prefix = this.get("prefix"),
                panel = container,
                wrap = $("<div></div>");

            //panel wrap
            wrap.insertAfter(panel).append(panel);

            //���ӻ�����ʽ
            wrap.addClass(prefix+"container")
                .css({
                    position:"relative",
                    overflow:"hidden",
                    width:panel.outerWidth(),
                    height:panel.outerHeight()
                });

            //������
            wrap.append(
                $("<div></div>")
                    .addClass(prefix+"track")
                    .css({
                        "position":"absolute",
                        "right":0
                    })
                    .append(
                        $("<div></div>")
                            .addClass(prefix+"drag")
                            .css({
                                "position":"absolute",
								"left":0
                            })
                            .append(
                                $('<div class="'+prefix+'dragtop"></div><div class="'+prefix+'dragbottom"></div><div class="'+prefix+'dragcenter"></div>')
                            )
                    )
            );

            //���ϣ����¼�ͷ
            if(this.get("arrow")===true){
                wrap.append(
                    $("<a></a>")
                        .css({
                            "position":"absolute",
                            "right":0
                        })
                        .attr({
                            href:"javascript:",
                            tabindex:-1
                        })
                        .addClass(prefix+"arrowup")
                        .text("Scroll up")
                );
                wrap.append(
                    $("<a></a>")
                        .css({
                            "position":"absolute",
                            "right":0
                        })
                        .attr({
                            href:"javascript:",
                            tabindex:-1
                        })
                        .addClass(prefix+"arrowdown")
                        .text("Scroll down")
                );
            }
            
            //����panel hook
            panel.css({
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
					"width": wrap.innerWidth(),
                    "height": "auto",
                    "overflow": "visible"
                })
                .addClass(prefix+"body");


            return wrap;

        },

        //���¼�
        _bindEvt: function(){
            var self = this,
				prefix = self.get("prefix");

            //�����¼�
            this.get("container").on("mousewheel", function(ev){
                ev.halt();
                var sh = self.get("extent");
                self.scrollDistance(ev.deltaY===1?sh:-sh);
            });

            //���¼�ͷ
			if(this.get("arrow")===true){
                var speed = 0,
                    speedx = 30,
                    timer = null,
                    timeSet = function(d){
                        speed += 1;
                        speedx = speedx/speed;
                        var sh = d=="down"?self.get("extent"):toNegative(self.get("extent")),
                            t =300 - speed*25;
                        self.scrollDistance(sh);
                        if(t<=30){t=30};
                        timer = setTimeout(function(){timeSet(d);},t);
                    };

				this.get("arrowUp").on("click", function(ev){
                    ev.halt();
                    var sh = self.get("extent");
					self.scrollDistance(sh);
				}).on("mousedown", function(ev){
                    ev.halt();
					$(this).addClass(prefix+"arrowup-active");
                    timeSet("down");
                }).on("mouseup", function(ev){
                    ev.halt();
					$(this).removeClass(prefix+"arrowup-active");
                    speed = 0;
                    speedx = 50;
                    clearTimeout(timer);
                }).on("mouseleave",function(ev){
                    //��mouseup�����ʱ�������ף���Ϊ��Щ����¿��Բ�ִ��mouseup
                    ev.halt();
					$(this).removeClass(prefix+"arrowup-active");
                    speed = 0;
                    speedx = 50;
                    clearTimeout(timer);
                }).on("mouseover",function(ev){
					ev.halt();
					$(this).addClass(prefix+"arrowup-hover");
				}).on("mouseout",function(ev){
					ev.halt();
					$(this).removeClass(prefix+"arrowup-hover");
				});

				this.get("arrowDown").on("click", function(ev){
                    ev.halt();
                    var sh = self.get("extent");
					self.scrollDistance(-sh);
				}).on("mousedown", function(ev){
                    ev.halt();
					$(this).addClass(prefix+"arrowdown-active");
                    timeSet("up");
                }).on("mouseup", function(ev){
                    ev.halt();
					$(this).removeClass(prefix+"arrowdown-active");
                    speed = 0;
                    speedx = 50;
                    clearTimeout(timer);
                }).on("mouseleave",function(ev){
                    ev.halt();
					$(this).removeClass(prefix+"arrowdown-active");
                    speed = 0;
                    speedx = 50;
                    clearTimeout(timer);
                }).on("mouseover",function(ev){
					ev.halt();
					$(this).addClass(prefix+"arrowdown-hover");
				}).on("mouseout",function(ev){
					ev.halt();
					$(this).removeClass(prefix+"arrowdown-hover");
				});
			}

            //�������
            this.get("track").on("click", function(ev){
				ev.halt();
                self.scrollByPercent(ev.offsetY/self.get("track").outerHeight());
                self.updateBar();
            }).on("mouseover", function(ev){
				ev.halt();
				$(this).addClass(prefix+"track-hover");
			}).on("mouseout", function(ev){
				ev.halt();
				$(this).removeClass(prefix+"track-hover");
			});

            //�϶�������
            (function(){
                var pageY,
                    current = 0,
                    movefun = function(e2){
						e2.halt();
                        //self._moveBar(current,e2.pageY-pageY);
                        var track = self.get("track"),
                            trackLen = track.innerHeight(),
                            drag = self.get("drag"),
                            dragLen = drag.outerHeight(),
                            position = current+(e2.pageY-pageY);

                        //������
                        if(position<0){
                            position = 0;
                        }

                        //������
                        if(position>(trackLen-dragLen)){
                            position = trackLen-dragLen;
                        }

                        drag.css("top",position);
                        self.scrollByPercent(position/(trackLen-dragLen));
                    };
				
				//�󶨸���drag�¼�
                self.get("drag")
					.on("mouseover",function(ev){
						$(this).addClass(prefix+"drag-hover");
					})
					.on("mouseout",function(ev){
						$(this).removeClass(prefix+"drag-hover");
					})
					.on("click",function(ev){
						ev.halt()
					})
					.unselectable()
					.on("mousedown", function(ev){
						ev.halt();
						var tg = $(ev.target);
						$(this).addClass(prefix+"drag-active");
						current = parseInt(self.get("drag").css("top"));
						pageY = ev.pageY;
						$(document)
							.on("mousemove",movefun)
							.on("mouseup", function(){
								tg.removeClass(prefix+"drag-active");
								$(document).detach("mousemove",movefun);
							});

					})
					.on("mouseup", function(ev){
						//���ﲻ��ev.halt();
						$(ev.target).removeClass(prefix+"drag-active");
					});
            })();

        },
		
		//���ô�С
		resize: function(w,h){
			
			this.get("container").css({
				width:w,
				height:h
			});

            this.get("body").css({
                width:this.get("container").innerWidth()-this.get("track").outerWidth()
            })
			
			this.setSize();
			
		},

		//���ô�С
		setSize: function() {
            var height = this.get("container").height();

            //���ù�������
            var bh = this.get("body").outerHeight(),
                ch = this.get("container").outerHeight(),
                ah = this.get("arrow")===true?(this.get("arrowUp").outerHeight() + this.get("arrowDown").outerHeight()):0;
			
			if(bh<ch){
				this.get("drag").hide();
			}else{
				this.get("drag").show();
			}
			
            if(bh<=0 || ch<=0){
                var sh = this.set("extent","20");
            }else{
                var sh = (ch - 2*ah) * ch / bh;
                this.set("extent",sh/6);
            }

            //����м�ͷ
            if(this.get("arrow")){
                this.get("track").css({
                    height:height-this.get("arrowUp").outerHeight()-this.get("arrowDown").outerHeight(),
                    top:this.get("arrowUp").outerHeight()
                });
                this.get("arrowUp").css({
                    top:0
                });
                this.get("arrowDown").css({
                    bottom:0
                });
            }else{
                this.get("track").css({
                    height:height,
                    top:0
                });
            }

            if(sh>this.get("track").outerHeight()){
                sh = this.get("track").outerHeight();
            }

            if(sh<20){
                sh=20;
            }

            //drag
            this.get("drag").css({
                height: sh
            });

		},

		//������ָ��λ��
		_scrollBodyToPosition: function(position) {
            var container = this.get("container"),
                body = this.get("body"),
                h = body.outerHeight()-container.outerHeight();

            //�������
            if(h<=0){
                return;
            }

            //������
            if(position>0){
                position = 0;
            }

            //������
            if(toPositive(position)>h){
                position = toNegative(h);
            }

            body.css("top",position);
		},

        scrollDistance: function(distance){
            var position = parseInt(this.get("body").css("top"))+distance;
            this._scrollBodyToPosition(position);
            this.updateBar();
        },

        scrollByPercent: function(percent){
            var self = this;
			percent = parseFloat(percent);
			if(isNaN(percent) || percent>1 || percent<0){
				return;
			}
			var d = (self.get("body").outerHeight()-self.get("container").innerHeight())*(-percent);
            this._scrollBodyToPosition(d);
			this.updateBar();
        },

        //������ָ��Ԫ��
        toEl: function(el){
            el = $(el);
            if(!el.length>0)return;
            var position = el["0"].offsetTop;
            this._scrollBodyToPosition(-position);
            this.updateBar();
        },

        //ͬ��������λ��
        updateBar: function(){
            var self = this,
                th = this.get("track").innerHeight(),
                dh = this.get("drag").outerHeight(),
                rh = th-dh,
                percent = toPositive(parseInt(self.get("body").css("top")))/(self.get("body").outerHeight()-self.get("container").innerHeight());

            this.get("drag").css({
                top: percent*rh
            });
        }

	});

    return Scroll;

},{
	requires:["node"]
});
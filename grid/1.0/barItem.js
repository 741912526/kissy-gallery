KISSY.add("gallery/grid/1.0/barItem",function(S){
	var DOM = S.DOM,Node = S.Node;

	/*��������*/
	function capitalFirst(s) {
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    }

	/**
	* @exports S.LP as KISSY.LP
	*/

	//����
	var UI_SET = '_uiSet',
		ATTR_BUTTON_DISABLED = 'disabled',//���ð�ť����
		CLS_DISABLE = 'lp-item-disabled',//���ð�ť��ʽ
		CLS_BTN_CONTAINER = 'bar-btn-container',
		CLS_TEXT_CONTAINER = 'pb-text-container',
		CLS_BTN_CUSTOM = "bar-btn-custom",//�Զ��尴ť����Ӧ��һ�㰴ť������Ч��
		CLS_ITEM_BTN = 'bar-item-btn',
		CLS_ITEM_OVER = 'bar-item-over',
		CLS_ITEM_SEPERATOR = 'bar-item-separator';
		CLS_ITEM_INPUT = 'pb-item-input',
		CLS_BAR_ICON = 'bar-icon';
		

	//���� bar Ԫ�صĻ���
	function barItem(config){
		var _self = this;
		config = S.merge({isBarItem:true,css:''},config);
		S.mix(_self,config);
		barItem.superclass.constructor.call(_self, config);
		_self._init();
	}

	S.extend(barItem, S.Base);
	S.augment(barItem,{
		/**
		* �����¼�
		*/
		attachEvent : function(){
			var _self = this,
				el = _self.get('el');
			if(el){
				if(_self.handler){
					el.on('click',_self.handler);
				}
			}
			
		},
		/**
		* ������ӵ� Bar��
		* @return {Node}
		*/
		renderTo : function(barEl){
			if(this.get('el')){
				return this.get('el');
			}
			var _self = this,
				temp = _self._getItemTemplate(),
				node = new S.Node(temp).appendTo(barEl);;
			_self.set('el',node);
			return node;
		},
		/**
		 * �������Ա仯���� UI
		 */
		_bindUI: function() {
			var self = this,
				attrs = self.__attrs,
				attr, m;

			for (attr in attrs) {
				if (attrs.hasOwnProperty(attr)) {
					self.on('after' + capitalFirst(attr) + 'Change', function(ev) {
							self[attr] = ev.newVal;
					});
					m = UI_SET + capitalFirst(attr);
					if (self[m]) {
						// �Զ����¼�����Ӧ����
						(function(attr, m) {
							self.on('after' + capitalFirst(attr) + 'Change', function(ev) {
								self[m](ev.newVal, ev);
							});
						})(attr, m);
					}
				}
			}
		},
		//��ȡԪ�ص�ģ��
		_getItemTemplate : function(){
			return '';
		},
		//��ʼ��
		_init : function(){
			var _self = this;
			_self._bindUI();
		},
		/**
		* �ͷſؼ���Դ
		*/
		destroy : function(){
			var _self = this,
				el = _self.get('el');
			
			el.remove();
			_self.detach();
			_self.__attrVals = {};

		}

	});

	//��ťԪ��
	function buttonBarItem(config){
		var _self = this;
			
		buttonBarItem.superclass.constructor.call(_self, config);
		
	}

	S.extend(buttonBarItem, barItem);
	S.augment(buttonBarItem,{
		/**
		* �����¼������еİ�ť �������¼�
		*/
		attachEvent : function(){
			var _self = this,
				el = _self.get('el');
			_self.constructor.superclass.attachEvent.call(_self);
			if(el){
				el.on('mouseover', function (event) {
					if (!el.hasClass(CLS_DISABLE)) {//����״̬�£�hoverЧ������Ч
						el.addClass(CLS_ITEM_OVER);
					}
				}).on('mouseout', function (event) {
					el.removeClass(CLS_ITEM_OVER);
				});
			}
		},
		_getItemTemplate : function(){
			var _self = this,
				clsDisable =  _self.disabled ? CLS_DISABLE : '',
				disabledText = _self.disabled ? 'disabled="disabled"' : '',
				clsCustom = _self.text ? CLS_BTN_CUSTOM : '',
				temp = ['<div id="',_self.id,'" class="', CLS_BTN_CONTAINER, ' ', clsDisable, ' ', _self.containerCss,'"><button class="', CLS_ITEM_BTN, ' ', _self.css, '" autocomplete="off" hidefocus="true" ', disabledText, ' type="button">', _self.text, '</button></div>'].join('');
			return temp;
		},
		_uiSetDisabled : function(disabled){
			var _self = this,
				el = _self.get('el'),
				button = el.one('button');
			if(disabled){
				el.addClass(CLS_DISABLE);
				button.attr(ATTR_BUTTON_DISABLED,'');
				el.removeClass(CLS_ITEM_OVER);
			}else{
				el.removeClass(CLS_DISABLE);
				button.removeAttr(ATTR_BUTTON_DISABLED);
				
			}
		}
	});
	
	//�ı�Ԫ��
	function textBarItem(config){
		var _self = this;
		textBarItem.superclass.constructor.call(_self, config);
	}

	S.extend(textBarItem, barItem);
	S.augment(textBarItem,{
		_getItemTemplate : function(){
			var _self = this;
			return ['<div id="',_self.id,'"  class="', CLS_TEXT_CONTAINER, _self.css ,'">',_self.text,'</div>'].join('');
		}
	});
	
	//�ָ��Ԫ��
	function seperatorBarItem(config){
		var _self = this;
		seperatorBarItem.superclass.constructor.call(_self, config);
	}

	S.extend(seperatorBarItem, barItem);
	S.augment(seperatorBarItem,{
		_getItemTemplate : function(){
			var _self = this;
			return '<div class="' + CLS_ITEM_SEPERATOR + '"></div>';
		}
	});
	
	//����Ԫ��
	function linkBarItem(config){
		var _self = this;
		linkBarItem.superclass.constructor.call(_self, config);
	}

	S.extend(linkBarItem, barItem);
	S.augment(linkBarItem,{
		_getItemTemplate : function(){
			var _self = this;
			return ['<div id="',_self.id,'"  class="', CLS_TEXT_CONTAINER, '"><a class="',_self.css,'" href = "',_self.href,'">',_self.text,'</a></div>'].join('');
		}
	});

	//�Զ���ģ��
	function customBarItem(config){
		var _self = this;
		customBarItem.superclass.constructor.call(_self, config);
	}

	S.extend(customBarItem, barItem);
	S.augment(customBarItem,{
		_getItemTemplate : function(){
			var _self = this;
			return S.substitute(_self.template,_self);
		}
	});
	
	//bar Ԫ�ص�����
	barItem.types = {
		button : buttonBarItem, //��ť����
		text : textBarItem,		//�ı�����
		link : linkBarItem,		//��������
		custom : customBarItem,	//�Զ�������
		seperator : seperatorBarItem //�ָ���Ϣ��
	};
	
	return barItem;
}, {requires : []});
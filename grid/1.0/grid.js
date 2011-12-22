/** @fileOverview ���ؼ�
* ��������񣬿ɱ༭��񣬱��༭��
* @author <a href="mailto:dxq613@gmail.com">������ ������dxq613</a>  
* @version 1.0.1  
*/
KISSY.add("gallery/grid/1.0/grid",function (S,ButtonBar,PaggingBar,LoadMask) {
	/** 
		@exports S.LP as KISSY.LP
	*/

	var DOM = S.DOM,
		UA = S.UA,
        Node = S.Node;
		
	//����	
	var	ATTR_COLUMN_NAME = 'data-column-name',
		CLS_HEADER_TH = 'grid-header-th',
		CLS_HEADER_TH_EMPTY = 'grid-header-th-empty',
		CLS_HEADER_TH_INNER = 'grid-header-th-inner',
        CLS_HEADER_TITLE = 'grid-header-inner-title',
		CLS_CELL_TEXT = 'grid-body-cell-text',
		CLS_CHECKBOX = 'grid-checkbox',
		CLS_GRID_ROW = 'grid-row',
		CLS_GRID_ROW_SELECTED = 'grid-row-selected',
		CLS_GRID_ROW_OVER = 'grid-row-over',
		CLS_GRID_CELL = 'grid-body-cell',
		CLS_GRID_CELL_INNER = 'grid-body-cell-inner',
		CLS_HOVER = 'hover',
		CLS_SORT = 'sortable',
		CLS_SORT_ASC = 'sorted-asc',
		CLS_SORT_DESC = 'sorted-desc',
		CLS_ROW_ODD = 'grid-row-odd',
		CLS_ROW_EVEN = 'grid-row-even',
		DATA_ELEMENT = 'row-element',
		COLUMN_DEFAULT_WIDTH = 80,
		HEADER_HIGHT = 25,
		BAR_HIGHT = 25,
		COLUMN_WIDTH_CHECKED = 30,
		COLUMN_WIDTH_DEFAULT = 80,
		COLUMN_WIDTH_EMPTY = 15;
	/**
	* ���ؼ�
	* @memberOf S.LP
	* @description ����չʾ����
	* @class ���ؼ���
	* @param {Object} config ������
	* @param {String} config.renderTo ��Ⱦ��Ŀ���Id
	* @param {Array} config.columns �е�������
	* @param {String} config.columns[0].title ����
	* @param {Number} [config.columns[0].width=80] �п��
	* @param {String} config.columns[0].dataIndex ��Ӧ�����ֶ�
	* @param {Boolean} [config.columns[0].sortable=false] �����Ƿ������
	* @param {Boolean} [config.columns[0].hide = false] �Ƿ����ش���
	* @param {Function} [config.columns[0].renderer] һ����ʽ��������������ת���ɶ�Ӧ�ĸ�ʽ��ʾ�������ṩ�����Dom�ṹ��
	* @param {Boolean} [config.columns[0].showTip=false]  ��ʾ������Ϣ���ض��ı�ʱʹ��
	* @param {String} [config.columns[0].cls]  ��ͷӦ�õ���ʽ�������ʽ�� ��,�� �ָ�
	* @example 
	* //������
	* columns:[
	*      { title: '���', sortable: true,  dataIndex: 'Clicks',  showTip: true,renderer:function(value,obj){
    *               return value + obj.TotalCost;
    *      } },
    *      { title: '�ܻ���', sortable: true,  dataIndex: 'TotalCost',cls :'custom1,custom2'}
    *      
	* },
	* @param {Number} [config.width] ����ȣ�Ĭ���±��Ŀ�ȵ��ڸ�Ԫ�صĿ�ȣ�������ݿ�ȳ������õĿ�ȣ�����ֺ��������
	* @param {Number} [config.height] ���߶ȣ�Ĭ��״̬���߶ȸ��������Զ���չ��������ݸ߶ȳ������õĿ�ȣ���������������
	* @param {S.LP.Store} [config.store] ���ݻ�����󣬶����ݵĲ��������ڴ˶����� @see S.LP.Store
	* @param {Bar} [config.tbar] ����ϲ��İ�ť��������ڲ����� pageSize������Ϊ��ҳ��������Ϊ��ͨ��ť��
	* @param {Number} [config.tbar.pageSize] ��ҳ���ĵ�ҳ��¼���������ڼ����ҳ
	* @param {Array} [config.tbar.buttons] ��ť���İ�ť����
	* @example
	* //��ҳ������
	* tbar:{pageSize : 30}
	* //��ť������
	* tbar:{buttons:[{id:' ',text:'���һ��',handler:function(event){},css:'bar-btn-add'}]
	* @param {Bar} config.bbar ͬ config.tbar
	* @param {Boolean} [config.loadMask = true] ��������ʱ���Ƿ���ʾ����,
	* @param {Boolean} [config.checkable = false]: �Ƿ��ѡ����ʾѡ���,
	* @param {Boolean} [config.forceFit=false]: ��ָ���˱����ʱ����ʱ�����ֺ������������������ǿ������Ӧ�����
	* @example 
	* ���������
	* var config = {
	* 	renderTo:'mygrid', //����Id
	* 	width:500,// ���
	* 	height:300,//�߶�
	* 	checkable:true,//�Ƿ������ѡ
	* 	columns: [//�ж���
	* 			   { title: ' ', width: 30, sortable: false, dataIndex: 'SearchEngine',hide : true, renderer: function(data){
	* 						if(data===4){
	* 								 return '�ٶ�';
	* 						}else{
	* 								 return '�ȸ�';
	* 						}
	* 			   }
	* 			   },
	* 			   { title: '���', width: 100, sortable: true, dataIndex: 'AccountId', selectable: true },
	* 	 
	* 			   { title: '�˻�', width: 200, sortable: false, dataIndex: 'AccountName', selectable: true,renderer:function(value){
	* 						if(S.isArray(value)){
	* 								 return value.join('');
	* 						}
	* 						return value;
	* 			   } },
	* 			   { title: '���', sortable: true,  dataIndex: 'Clicks',  showTip: true,renderer:function(value,obj){
	* 						return value + obj.TotalCost;
	* 			   } },
	* 			   { title: '�ܻ���', sortable: true,  dataIndex: 'TotalCost',editor:{type:'number'}
	* 			   },
	* 			   { title: '�ܻ���', sortable: true,  dataIndex: 'sum',renderer:function(value,obj){
	* 								 return obj.TotalCost *2;
	* 						}
	* 			   }       
	* 			  
	* 	],
	* 	forceFit:true,//ǿ��������Ӧ��ʹ����޹�����
	* 	store:store,//���ݻ������
	* 	tbar:{buttons:[{id:' ',text:'���һ��',handler:function(event){},css:'bar-btn-add'}]
	* 	},//���水ť��
	* 	bbar:{pageSize:30},//���淭ҳ��
	* 	loadMask:true//�Ƿ���ʾ���أ�����������ʱ�������α����ʾ��Loading...��Ϣ
	* 	};
	*/
	function Grid(config) {
		var _self = this;
		config = config || {};
		if (!config.renderTo) {
			throw 'please assign the id of rendered Dom!';
		}
		config = S.merge(Grid.config, config);

		Grid.superclass.constructor.call(_self, config);
		//֧�ֵ��¼�
		_self.events = [
			/**  
			* ��ʼ��������
			* @name S.LP.Grid#beginappend 
			* @event  
			* @param {event} e  �¼�����
			* @param {Array} e.data ������ʾ������
			*/
			'beginappend',
			/**  
			* �����������
			* @name S.LP.Grid#afterappend 
			* @event  
			* @param {event} e  �¼�����
			* @param {Array} e.data ������ʾ������
			* @param {Array} e.rows ������ʾ��������DOM�ṹ
			*/
			'afterappend',
			/**  
			* ��ʼ��ʾ���ݣ�һ��������Դ���������ݣ���ʼ�ڱ������ʾ����
			* @name S.LP.Grid#beginshow
			* @event  
			* @param {event} e  �¼�����
			*/
			'beginshow',
			/**  
			* ��ʾ������ɣ�һ��������Դ���������ݣ����ڱ������ʾ���
			* @name S.LP.Grid#aftershow
			* @event  
			* @param {event} e  �¼�����
			*/
			'aftershow',
			/**  
			* �Ƴ��У�һ��������Դ�Ƴ����ݺ󣬱���Ƴ���Ӧ��������
			* @name S.LP.Grid#rowremoved
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row �ж�Ӧ��DOM����
			*/
			'rowremoved',
			/**  
			* ����У�һ��������Դ������ݡ��������ݺ󣬱����ʾ��Ӧ���к󴥷�
			* @name S.LP.Grid#rowcreated
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row �ж�Ӧ��DOM����
			*/
			'rowcreated',
			/**  
			* ��ҳǰ����������ͨ�� return false ,��ֹ��ҳ
			* @name S.LP.Grid#beforepagechange
			* @event  
			* @param {event} e  �¼�����
			* @param {Number} e.from ��ǰҳ
			* @param {Number} e.to Ŀ��ҳ
			*/
			'beforepagechange',
			/**  
			* �е���¼�
			* @name S.LP.Grid#rowclick
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row �ж�Ӧ��DOM����
			* 
			*/
			'rowclick',
			/**  
			* ��Ԫ�����¼�
			* @name S.LP.Grid#cellclick
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row ����ж�Ӧ��DOM����
			*/
			'cellclick',
			/**  
			* ��ѡ���¼�
			* @name S.LP.Grid#rowselected
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row �ж�Ӧ��DOM����
			* @param {DOM} e.cell ����ĵ�Ԫ���Ӧ��DOM����
			* @param {DOM} e.domTarget �����¼���DOM���� ��ͬ������¼��е�e.target
			* @param {String} field �˵�Ԫ���Ӧ���ֶ���
			*/
			'rowselected',
			/**  
			* ��ȡ��ѡ���¼�
			* @name S.LP.Grid#rowunselected
			* @event  
			* @param {event} e  �¼�����
			* @param {Object} e.data �ж�Ӧ�ļ�¼
			* @param {Object} e.row �ж�Ӧ��DOM����
			*/
			'rowunselected'
		];
		_self._init();

	}

	Grid.config = {
	};
	S.extend(Grid, S.Base);
	S.augment(Grid, 
	/** @lends  S.LP.Grid.prototype */		
	{
		/**
		* ��������
		* @private
		* @param {Array} data ��ӵ�����ϵ�����
		*/
		appendData : function (data) {
			var _self = this,
				rows = [];
			_self.fire('beginappend',{data : data});
			S.each(data, function (obj, index) {
				var row = _self._createRow(obj, index);
				rows.push(row);
			});
			_self.fire('afterappend', {rows : rows, data : data});
		},
		/**
		* ��ӻ�������
		* @param {Object} summary ��������
		*/
		addSummary : function (summary){
			var _self = this,
				foot = _self.get('tfoot');
			S.all(foot.rows).remove();
			this._createSummaryRow(summary);
		},
		/**
		* ��ձ��
		*/
		clearData : function () {
			var _self = this,
				body = _self.get('tbody');
			_self._setHeaderChecked(false);
			S.all(body.rows).remove();
			//DOM.text(body, '');
		},
		/**
		* ȡ��ѡ�еļ�¼
		*/
		clearSelection : function () {
			this._setAllRowsSelected(false);
		},
		/**
		* ������ʾ���ݣ������ֶ������ֶ�ֵ��������
		* @param {String} field �ֶ��� 
		* @param {Object|Function} �����ֶε�ֵ������ƥ�亯��
		* @example 
		*	grid.filter('id',124); //����ʾ id ==124����
		*	
		*	grid.filter('id',function(value){
		*		if(value>124)
		*			return true;//����true��ʾ
		*		return false;	//����false ����ʾ
		*	});
		*/
		filter : function (field, value) {
			var _self = this,
				body = _self.get('tbody'),
				rows = S.makeArray(body.rows),
				func = typeof value === 'function' ? value : function (val) {return val === value; };
			S.each(rows, function (row) {
				var rowEl = S.one(row),
					obj = DOM.data(row, DATA_ELEMENT);
				if (value === null) {
					rowEl.show();
				} else if (!obj || !func(obj[field])) {
					rowEl.hide();
				} else {
					rowEl.show();
				}
			});
		},
		/**
		* ��ȡ�����
		* @return {Number}
		*/
		getWidth : function () {
			var _self = this;
			return _self.get('width') || _self.get('gridEl').width();
		},
		/**
		* ��ȡѡ�е�����
		* @return {Array} ����ѡ�е�����
		*/
		getSelection : function () {
			var _self = this,
				tbody = _self.get('tbody'),
				selectedRows = S.all('.' + CLS_GRID_ROW_SELECTED, tbody),
				objs = [];

			S.each(selectedRows, function (row) {
				var obj = DOM.data(row, DATA_ELEMENT);
				if (obj) {
					objs.push(obj);
				}
			});
			return objs;
		},
		/**
		* ��ȡѡ�еĵ�һ������
		* @return {Object} ����ѡ�еĵ�һ������
		*/
		getSelected : function () {
			var _self = this,
				tbody = _self.get('tbody'),
				row = S.one('.' + CLS_GRID_ROW_SELECTED, tbody);

			return row ? DOM.data(row, DATA_ELEMENT) : null;
		},
		/**
		* ����ѡ�е�����
		* @param {String} field �ֶ����� 
		* @param {Array} values ѡ���еĶ�Ӧ�ֶε�ֵ
		* @example
		*	grid.setSelection('id',['123','22']);
		*/
		setSelection : function (field, values) {
			var _self = this,
				tbody = _self.get('tbody'),
				rows = tbody.rows;
            S.each(rows, function (row) {
                var obj = DOM.data(row, DATA_ELEMENT);
                if (obj && S.inArray(obj[field], values)) {
					_self._setRowSelected(row, true);
                }
            });
		},
		/**
		* ���ñ��߶�
		* @param {Number} ���ñ��ĸ߶�
		*/
		setHeight : function(height){
			var _self = this,
				gridEl = _self.get('gridEl'),
				subHeight = HEADER_HIGHT,
				body = _self.get('body'),
				bodyEl = S.one(body);
			gridEl.height(height);
			if (_self.get('tbar')) {
				subHeight += (BAR_HIGHT + 2);
				if(_self.get('tbar').buttons){
					subHeight += 4;
				}
			}
			if (_self.get('bbar')) {
				subHeight += (BAR_HIGHT + 2);
			}
			if (height - subHeight > 0) {
				bodyEl.height(height - subHeight);
				bodyEl.css('overflow-y','scroll');
			}
		},
		/**
		* @private
		* ���ñ����
		*/
		setWidth : function (width) {
			var _self = this,
				body = _self.get('body'),
				gridEl = _self.get('gridEl');
			gridEl.width(width);
			S.one(body).width(width - 2);
			gridEl.children('.grid-view').width(width - 2);

		},
		/**
		* 
		* ���� 
		* @private
		* @param {String|Object} column ������ֶ�������������
		* @param {String} sortDirection ������ ASC��DESC
		* @example
		* grid.sort('id','ASC');//��� id �ֶ���������
		*/
		sort : function (column, sortDirection) {
			var _self = this,
				field,
				store = _self.get('store'),
				direct = sortDirection === 1 ? 'ASC' : 'DESC';
			if (typeof column === 'string') {
				field = column;
			} else {
				field = column.dataIndex;
			}

			if (store) {
				store.sort(field, direct);
			}else{
				_self._localSort(field, sortDirection);
			}
		},
		/**
		* ��ʾ����
		* @param {Array} data ��ʾ������
		* 
		*/
		showData : function (data) {
			var _self = this;
			_self.fire('beginshow');
			_self.clearData();
			S.each(data, function (obj, index) {
				_self._createRow(obj, index);
			});
			_self._afterShow();
			_self.fire('aftershow');
		},
		/**
		* �Ƴ�����
		* @private
		* @param {Array} data �Ƴ�������
		* 
		*/
		removeData : function (data) {
			var _self = this,
				tbody = _self.get('tbody'),
				rows = S.makeArray(tbody.rows);
            S.each(rows, function (row) {
                var obj = DOM.data(row, DATA_ELEMENT);
                if (obj && S.inArray(obj, data)) {
					_self.fire('rowremoved',{data : obj,row : row});
					DOM.remove(row);
                }
            });
		},
		//����б���ʾ����������¼�
		_addBodyEvent : function (tbody) {
			var _self = this,
				head = _self.get('head'),
				body = _self.get('body'),
				bodyEl = S.one(body);
			S.one(tbody).on('click', function (event) {
				_self._rowClickEvent(event.target);
			}).on('mouseover', function (event) {
				_self._rowOverEvent(event.target);
			}).on('mouseout', function (event) {
				_self._rowOutEvent(event.target);
			});
			bodyEl.on('scroll', function (event) {
				var left = bodyEl.scrollLeft();
				S.one(head).scrollLeft(left);
			});
		},
		_afterShow : function () {
			var _self = this,
				tbody = _self.get('tbody'),
				body = _self.get('body'),
				bodyEl = S.one(body),
				height,
				bodyWidth,
				bodyScroolWidth;
			if (UA.ie === 6 || UA.ie === 7) {
				height = _self.get('height');
				if (!height) {
					bodyWidth = bodyEl.width();
					bodyScroolWidth = body.scrollWidth;
					if (bodyScroolWidth > bodyWidth) {
						tbodyHeight = S.one(tbody).height();
						bodyEl.height(tbodyHeight + 17);
					}else{
						bodyEl.css('height','auto');
					}
				}
			}
		},
		_createRow : function (element, index) {
			var _self = this,
				body = _self.get('tbody'),
				rowTemplate = _self._getRowTemplate(index, element),
				rowEl = new Node(rowTemplate).appendTo(body),
				dom = rowEl.getDOMNode(),
				lastChild = dom.lastChild;
			DOM.data(dom, DATA_ELEMENT, element);
			DOM.addClass(lastChild, 'lp-last');
			_self.fire('rowcreated',{data : element,row : dom});
            return rowEl;
		},
		_createSummaryRow : function (summary) {
			var _self = this,
				foot = _self.get('tfoot'),
				rowTemplate = _self._getSummaryTemplate(summary),
				rowEl = new Node(rowTemplate).appendTo(foot);
			return rowEl;
		},
		_lookupByClass : function (element, css) {
			if (DOM.hasClass(element, css)) {
				return element;
			}
			return DOM.parent(element, '.' + css);
		},
		_findRowByRecord : function (record) {
			var _self = this,
				tbody = _self.get('tbody'),
				rows = tbody.rows,
				result = null;
            S.each(rows, function (row) {
                var obj = DOM.data(row, DATA_ELEMENT);
                if (obj === record) {
					result = row;
					return false;
                }
            });
			return result;
		},
		_findRow : function (element) {
			return this._lookupByClass(element, CLS_GRID_ROW);
		},
		_findCell : function (element) {
			return this._lookupByClass(element, CLS_GRID_CELL);
		},
		//ǿ��������Ӧ�����
		_forceFitColumns : function (columns) {
			var _self = this,
				gridWidth = _self.getWidth(),
				setHeight = _self.get('height'),
				columnsWidth = 0,
				showCount = 0,
				checkWidth = _self.get('checkable') ? COLUMN_WIDTH_CHECKED + 1 : 0,
				extraWidth = 0,
				times = 1,
				realWidth = 0,
				count = 0,
				appendWidth = 0;
			columns = columns || _self.get('columns');
			count = columns.length;
			S.each(columns, function (column) {
				column.width = column.width || COLUMN_WIDTH_DEFAULT;
				var colWidth = column.originWidth || column.width;
				if (!column.hide) {
					columnsWidth += colWidth;
					showCount += 1;
				}
			});

			extraWidth = showCount * 2 + 2 + checkWidth + (setHeight ? COLUMN_WIDTH_EMPTY + 2 : 0);
			times = (gridWidth - extraWidth) / columnsWidth;
			realWidth = 0;
			if (times !== 1) {
				S.each(columns, function (column) {
					if (!column.hide) {
						column.originWidth = column.originWidth || column.width;
						column.width = Math.floor(column.originWidth * times);
						realWidth += column.width;
					}
				});
				appendWidth = gridWidth - (realWidth + extraWidth);
				if (count) {
					columns[count - 1].width += appendWidth;
				}
			}
		},
		_getCheckedCellTemplate : function (clsCheck, clscell) {
			return ['<td width="30px" align="center" class="', clsCheck, ' ', clscell, '"><div class="', clscell, '-inner"><span class="gwt-CheckBox"><input type="checkbox" class="', CLS_CHECKBOX, '" tabindex="0"></span></div></td>'].join('');
		},
		_getColumn : function(field){
			var _self = this,
				columns = _self.get('columns'),
				result = null;
			S.each(columns,function(column){
				if(column.dataIndex == field){
					result = column;
					return false;
				}
			});
			return result;
		},
		//��ȡ�е�ģ��
		_getRowTemplate : function (index, obj) {
			var _self = this,
				cells = _self.get('columns'),
				oddCls = index % 2 === 0 ? CLS_ROW_ODD : CLS_ROW_EVEN,
				cellTempArray = [],
				rowTemplate = null,
				cellTemp = null,
				emptyTd = '',
				checkable = _self.get('checkable');
			if (checkable) {
				cellTemp =  _self._getCheckedCellTemplate('grid-row-checked-column', CLS_GRID_CELL);
				cellTempArray.push(cellTemp);
			}
			S.each(cells, function (column, colindex) {
				var value = obj[column.dataIndex],
					text = column.renderer ? column.renderer(value, obj) : value,
					temp = _self._getCellTemplate(colindex, column, text,value,obj);
				cellTempArray.push(temp);
			});

			rowTemplate = ['<tr rowIndex="', index, '" class="', CLS_GRID_ROW, ' ',oddCls,'">', cellTempArray.join(''), emptyTd, '</tr>'].join('');
			return rowTemplate;
		},
		//��ȡ�����еļ�¼
		_getSummaryTemplate : function (summary) {
			var _self = this,
				cells = _self.get('columns'),
				cellTempArray = [],
				prePosition = -1,	//�ϴλ����е�λ��
				currentPosition = -1,//��ǰλ��
				checkable = _self.get('checkable');
			if(checkable){
				currentPosition += 1;
			}
			
			/**
			* @private
			*/
			function getEmptyCellTemplate(colspan){
				if(colspan > 0) {
					return '<td class="' + CLS_GRID_CELL + '" colspan="' + colspan + '"></td>';
				} else {
					return '';
				}
			}
			S.each(cells, function (column, colindex) {
				if(!column.hide){
					currentPosition += 1;
					if(column.summary){
						cellTempArray.push(getEmptyCellTemplate(currentPosition-prePosition - 1));
						var value = summary[column.dataIndex],
							text = '�ܼƣ�' + (column.renderer ? column.renderer(value, summary) : value),
							temp = _self._getCellTemplate(colindex, column, text,summary);
						cellTempArray.push(temp);
						prePosition = currentPosition;
					}
				}
			});
			if(prePosition !== currentPosition){
				cellTempArray.push(getEmptyCellTemplate(currentPosition-prePosition));
			}

			rowTemplate = ['<tr class="', CLS_GRID_ROW, '">', cellTempArray.join(''), '</tr>'].join('');
			return rowTemplate;

		},
		//��ȡ��Ԫ���ģ��
		_getCellTemplate : function (colindex, column, text,value,obj) {
			var dataIndex = column.dataIndex,
				width = column.width,
				tipText = column.showTip ? 'title = "' + (value||'') + '"' : '',
				hideText = column.hide ? 'ks-hidden' : '',
				template = ['<td  class="grid-body-cell grid-body-td-', dataIndex, ' ', hideText, '" data-column-name="', dataIndex, '" colindex="', colindex, '" width="', width, 'px">',
						'<div class="', CLS_GRID_CELL_INNER ,'" style="width : ', width, 'px"><span class="', CLS_CELL_TEXT, ' " ' , tipText, '>', text, '</span></div></td>'].join('');
			return template;
		},
		//��ȡ�е��ۼӿ�ȣ������е�Border
		_getColumnsWidth : function () {
			var _self = this,
				columns = _self.get('columns'),
				checkable = _self.get('checkable'),
				totalWidth = 0;
			if (checkable) {
				totalWidth += 31;
			}
			S.each(columns, function (column) {
				if (!column.hide) {
					totalWidth += column.width + 2;
				}
			});
			return totalWidth;
		},
		//��ʼ��Grid
		_init : function () {
			var _self = this,
				gridId = _self.get('gridId'),
				container = _self.get('container'),
				renderTo = _self.get('renderTo'),
				gridTemp = null,
				gridEl = null,
				header = null,
				headerTable = null,
				body = null,
				table = null,
				width = 0,
				height = _self.get('height'),
				subHeight = 0;//�ڲ���ʾ���ݲ��ֵĸ߶�
			if (!container) {
				container = DOM.get('#' + renderTo);
				_self.set('container', container);
			}
			if (!gridId) {
                gridId =  renderTo + 'grid';
				_self.set('gridId', gridId);
            }
			gridTemp = ['<div id="', gridId, '" class="grid-panel"><div id="', gridId + 'tbar', '" class="grid-tbar" style="display : none;"></div><div class="grid-view"><div class="grid-header"><table  cellspacing="0" cellpadding="0" class="grid-table"><thead></thead></table></div><div class="grid-body grid-body-scroll"><table  cellspacing="0" cellpadding="0" class="grid-table"><tbody><tfoot></tfoot></tbody></table></div></div><div id="', gridId + 'bbar', '" class="grid-bbar" style="display : none;"></div></div>'].join('');
			//�������Ŀ��
            gridEl = new Node(gridTemp);
			gridEl.appendTo(container);
			_self.set('gridEl', gridEl);
			//tableԪ�أ�չ�ֱ�ͷ�����
			header = DOM.get('.grid-header', container);
			headerTable = DOM.get('.grid-table', header);
			body = DOM.get('.grid-body', container);
			table = DOM.get('.grid-table', body);
			_self.set('head', header);
			_self.set('body', body);
			_self.set('tbody', table.tBodies[0]);
			_self.set('tfoot', table.tFoot);
			_self.set('thead', headerTable.tHead);
			if (!_self._isAutoFitWidth()) {//��������˿�ȣ���ʹ�ô˿��
				width = _self.get('width');
				_self.setWidth(width);
			} else {						//���������еĿ������Grid���
				width = _self._getColumnsWidth();
				_self.setWidth(width + 2);
			}
			//��������˸߶ȣ�����Grid Body�ĸ߶ȣ�
			if (height) {
				_self.setHeight(height);
			}
			_self._initListeners();
			_self._initHeader();
			_self._initPaggingBar();
			_self._initData();
			_self._initEvent();
		},
		//��ʼ���¼�
		_initEvent : function () {
			this._initHeaderEvent();
			this._initBodyEvent();
			this._initDataEvent();
			this._initPaggingBarEvent();
		},
		//�б����ݵ��¼���ʼ��
		_initBodyEvent : function () {
			var _self = this,
				body = _self.get('tbody');
			_self._addBodyEvent(body);
		},
		//��ʼ�����ݣ����������Store�����������Զ���������
		_initData : function () {
			var _self = this,
				store = _self.get('store'),
				loadMask = _self.get('loadMask'),
				gridEl = _self.get('gridEl');
			if (loadMask) {
				loadMask = new LoadMask(gridEl, {msg : 'Loading...'});
				_self.set('loadMask', loadMask);
			}
			if (store && store.autoLoad) {
				//if(!sotre.hasLoad){
					store.load();
				//}
			}
		},
		//��ʼ��Store��ص��¼�
		_initDataEvent : function () {
			var _self = this,
				store = _self.get('store');
			if (store) {
				store.on('beforeload', function () {
					var loadMask = _self.get('loadMask');
					if (loadMask) {
						loadMask.show();
					}
				});
				store.on('load', function () {
					var results = store.getResult(),
						loadMask = _self.get('loadMask');
					_self.showData(results);
					if (loadMask) {
						loadMask.hide();
					}
				});
				store.on('localsort', function (event) {
					var direct = event.direction === 'ASC' ? 1 : -1;
					_self._localSort(event.field , direct);
				});
				store.on('addrecords', function (event) {
					var data = event.data;
					_self.appendData(data);
					//TODO
				});
				store.on('removerecords', function (event) {
					var data = event.data;
					_self.removeData(data);
					//TODO
				});
				store.on('exception', function () {
					var loadMask = _self.get('loadMask');
					if (loadMask) {
						loadMask.hide();
					}
				});
			}
		},
		//��ʼ����ͷ�¼�
		_initHeaderEvent : function () {
			var _self = this,
				header = _self.get('thead'),
				checkable = _self.get('checkable'),
				thCollections = S.all('.' + CLS_HEADER_TH_INNER, header);

			/**
			* @private
			*/
			function headMouseOver(event) {
				S.one(this).parent().addClass(CLS_HOVER);
			}

			/**
			* @private
			*/
			function headClick(event) {
				var sender = S.one(this),
					parentEl = sender.parent(),
					filed = null,
					sortDirect = null,
					sortNum = null;
				if (parentEl.hasClass(CLS_SORT)) {
					filed = parentEl.attr(ATTR_COLUMN_NAME);
					sortDirect = sender.hasClass(CLS_SORT_ASC) ? CLS_SORT_DESC : CLS_SORT_ASC;
					sortNum = sortDirect === CLS_SORT_ASC ? 1 : -1;
					thCollections.removeClass(CLS_SORT_ASC).removeClass(CLS_SORT_DESC);
					sender.addClass(sortDirect);
					_self.sort(filed, sortNum);
				}
			}

			/**
			* @private
			*/
			function headMouseOut(event) {
				S.one(this).parent().removeClass(CLS_HOVER);
			}

			thCollections.on('mouseover', headMouseOver)
				.on('mouseout', headMouseOut)
				.on('click', headClick);
			if (checkable) {
				S.one('.' + CLS_CHECKBOX, header).on('click', function () {
					_self._setAllRowsSelected(S.one(this).attr('checked'));
				});
			}
		},
		//��ʼ����ͷ
		_initHeader : function () {
			var _self = this,
				columns = _self.get('columns'),
				header = _self.get('thead'),
				tr = header.insertRow(0),
				checkable = _self.get('checkable'),
				totalWidth = 0,
				checkColumnTemplate = null,
				emptyWidth = 0,
				emptyTh = null;

			
			/**
			* �ڲ�������ֻ�ڴκ���������
			* @private
			*/
			function createColumn(column) {
				var sortable = column.sortable ? CLS_SORT : '',
					sortIcon = sortable ? '<span class="grid-header-sort-icon">&nbsp;</span>' : '',
					hideText = column.hide ? 'ks-hidden' : '',
					width = column.width,
					cls = column.cls,
					temp = ['<th align="left" class="', CLS_HEADER_TH, ' ', hideText, ' grid-header-column-', column.dataIndex, ' ', sortable, '" data-column-name="', column.dataIndex, '">',
                                                '<div class ="', CLS_HEADER_TH, '-inner ',cls,' "><span class="', CLS_HEADER_TITLE, '">', column.title, '</span>',
                                                sortIcon , '</div>',
                                            '</th>'].join(''),
					thEl = new Node(temp);
				thEl.width(width);
				thEl.appendTo(tr);
			}

			if (checkable) {
				checkColumnTemplate = _self._getCheckedCellTemplate('grid-header-checked-column', CLS_HEADER_TH);
                new Node(checkColumnTemplate).appendTo(tr);
			}
			if (_self.get('forceFit')) {
				_self._forceFitColumns();
			}
			//������ͷ��������
			S.each(columns, function (column) {
				var width =  column.width || COLUMN_DEFAULT_WIDTH;
				column.width = width;
				createColumn(column);
			});
			if (!_self._isAutoFitWidth()) {
				emptyTh = new Node('<th class="' + CLS_HEADER_TH + ' grid-header-th-empty"><div class ="' + CLS_HEADER_TH + '-inner"></div></th>');
				emptyTh.appendTo(tr);
				_self._autoSetInnerWidth();
			}
		},
		//��ʼ���¼�������
		_initListeners : function () {
			var _self = this,
				listeners = _self.get('listeners');
			if(listeners){
				for(var name in listeners){
					if(listeners.hasOwnProperty(name)) {
						_self.on(name, listeners[name]);
					}
				}
			}
		},
		//��ӱ�ͷ����Ŀ�ȣ���Ӧ�������������
		_setEmptyHeadCellWidth : function (emptyWidth) {
			var _self = this,
				header = _self.get('thead'),
				emptyEl = S.one('.' + CLS_HEADER_TH_EMPTY, header);
			if (emptyWidth <= 0) {
				emptyEl.hide();
			} else {
				emptyEl.attr('width', emptyWidth + 'px');
				emptyEl.show();
			}
		},
		//���ñ�ͷ���ͱ�����ݵĿ�ȣ��������������ֹ�����
		_autoSetInnerWidth : function () {
			var _self = this,
				header = _self.get('thead'),
				body = _self.get('tbody'),
				height = _self.get('height'),
				width = _self._getColumnsWidth(),
				headerWidth = 0,
				forceFit = _self.get('forceFit'),
				gridWidth = _self.getWidth(),
				emptyWidth = forceFit ? COLUMN_WIDTH_EMPTY : gridWidth < (width + 2) ? COLUMN_WIDTH_EMPTY : gridWidth - (width + 2);

			if(emptyWidth > 0 && emptyWidth < COLUMN_WIDTH_EMPTY){
				emptyWidth = COLUMN_WIDTH_EMPTY;
			}
			_self._setEmptyHeadCellWidth(emptyWidth);
			headerWidth = width + (emptyWidth ? emptyWidth + 2 : 0);
			S.one(header).parent().width(headerWidth);
			if (height) {
				width -= (COLUMN_WIDTH_EMPTY + 2);
			}
			S.one(body).parent().width(width);
		},
		_initPaggingBar : function () {
			var _self = this,
				gridId = _self.get('gridId'),
				tbarConfig = _self.get('tbar'),
				bbarConfig = _self.get('bbar'),
				store = _self.get('store'),
				pageSize = 0,
				tpbar = null,//����ķ�ҳ��
				tbbar = null,//����İ�ť��
				bpbar = null,
				params = null;
			/**
			* @private
			*/
			function createPaggingBar(config, renderTo) {
				var barconfig = S.merge(config, {renderTo : renderTo});
				if (store && !barconfig.store) {
					barconfig.store = store;
				}
				return new PaggingBar(barconfig);
			}

			/**
			* @private
			*/
			function createButtonBar(config,renderTo){
				var btnConfig = S.merge(config,{renderTo : renderTo});
				return new ButtonBar(btnConfig);
			}

			if (tbarConfig) {
				if(tbarConfig.pageSize){
					tpbar = createPaggingBar(tbarConfig, gridId + 'tbar');
					_self.set('tpaggingBar', tpbar);
					pageSize = tbarConfig.pageSize;
				}
				if(tbarConfig.buttons){
					tbbar = createButtonBar(tbarConfig, gridId + 'tbar');
					_self.set('tbuttonBar', tbbar);
				}
			}
			if (bbarConfig) {
				bpbar = createPaggingBar(bbarConfig, gridId + 'bbar');
				_self.set('bpaggingBar', bpbar);
				pageSize = bbarConfig.pageSize;
			}
			if (pageSize && store) {
				params = store.params;
				if (!params.start) {
                    params.start = 0;
					params.pageIndex = 0;
				}
				if (!params.limit || params.limit !== pageSize) {
					params.limit = pageSize;
				}
			}
		},
		_initPaggingBarEvent : function () {
			var _self = this,
				tbar = _self.get('tpaggingBar'),
				bbar = _self.get('bpaggingBar');
			if (tbar) {
				tbar.on('beforepagechange', function (event) {
					_self.fire('beforepagechange', event);
				});
			}

			if (bbar) {
				bbar.on('beforepagechange', function (event) {
					_self.fire('beforepagechange', event);
				});
			}
		},
		_isAutoFitWidth : function () {
			return !this.get('width');
		},
		_isRowSelected : function (row) {
			return S.one(row).hasClass(CLS_GRID_ROW_SELECTED);
		},
		_localSort : function (field, sortDirection) {
			var _self = this,
				tbody = _self.get('tbody'),
				store = _self.get('store'),
				rows = S.makeArray(tbody.rows);
			
			/**
			* @private
			*/
			function getCellValue(row, field) {
				var obj = DOM.data(row, DATA_ELEMENT);
				return obj ? obj[field] : '';
			}
			if(store){
				rows.sort(function (a, b) {
					var obj1 = DOM.data(a, DATA_ELEMENT),
						obj2 = DOM.data(b, DATA_ELEMENT);;
					return store.compare(obj1,obj2);
				});
			}else{
				rows.sort(function (a, b) {
					var aText = getCellValue(a, field),
						bText = getCellValue(b, field);
					if (aText < bText) {
						return -sortDirection;
					}
					if (aText > bText) {
						return sortDirection;
					}
					return 0;
				});
			}

			S.each(rows, function (row) {
				var rowEl = S.one(row);
				rowEl.appendTo(tbody);
			});
		},
		//�е� click �¼�
		_rowClickEvent : function (target) {
			var _self = this,
				row = _self._findRow(target),
				cell = _self._findCell(target),
				rowCheckable = _self.get('checkable'),
				data = null;
			if (row) {
				data = DOM.data(row, DATA_ELEMENT);
				_self.fire('rowclick', {data : data, row : row});
				if (cell) {
					_self.fire('cellclick', {data : data, row : row, cell : cell, field : DOM.attr(cell, ATTR_COLUMN_NAME), domTarget : target});
				}
				if (rowCheckable) {
					if (!_self._isRowSelected(row)) {
						_self._setRowSelected(row, true);
					} else {
						_self._setRowSelected(row, false);
					}
				} else {
					S.all('.' + CLS_GRID_ROW_SELECTED, row.parentNode).removeClass(CLS_GRID_ROW_SELECTED);
					DOM.addClass(row, CLS_GRID_ROW_SELECTED);
				}
			}
		},
		//�е� mouseover �¼�
		_rowOverEvent : function (target) {
			var _self = this,
				row = _self._findRow(target);
			if (row) {
				S.one(row).addClass(CLS_GRID_ROW_OVER);
			}
		},
		//�е� mouseout �¼�
		_rowOutEvent : function (target) {
			var _self = this,
				row = _self._findRow(target);
			if (row) {
				S.one(row).removeClass(CLS_GRID_ROW_OVER);
			}
		},
		//�����п�
		_setColumnWidth : function(column,width){

			if(typeof(column) ==='string'){
				column = this._getColumn(column);
			}
			var _self = this,
				field = column.dataIndex,
				clsTh = '.grid-header-column-' + field,
				clsTd = '.grid-body-td' + field,
				thead = _self.get('thead'),
				tbody = _self.get('tbody');
			if(column.width != width){
				column.width = width;
				S.one(clsTh,thead).width(width);
				S.all(clsTd,tbody).width(width).children('.grid-body-cell-inner').width(width);
			}
		},
		//���ñ�ͷѡ��״̬
		_setHeaderChecked : function (checked) {
			var _self = this,
				header = _self.get('thead'),
				checkEl = S.one('.' + CLS_CHECKBOX, header);
			if (checkEl) {
				checkEl.attr('checked', checked);
			}
		},
		//������ѡ��
		_setRowSelected : function (row, selected) {
			var _self = this,
				rowEl = S.one(row),
				checkbox = DOM.get('.' + CLS_CHECKBOX, row),
				data = DOM.data(row, DATA_ELEMENT),
				hasSelected = DOM.hasClass(row, CLS_GRID_ROW_SELECTED);
			if (hasSelected === selected) {
				return;
			}
			if (checkbox) {
				checkbox.checked = selected;
			}
			if (selected) {
				DOM.addClass(row, CLS_GRID_ROW_SELECTED);
				_self.fire('rowselected', {data : data});
			} else {
				DOM.removeClass(row, CLS_GRID_ROW_SELECTED);
				_self._setHeaderChecked(false);
				_self.fire('rowunselected', {data : data, row : row});
			}
			_self.fire('rowselectchanged', {data : data, row : row});
		},
		//����ȫѡ
		_setAllRowsSelected : function (selected) {
			var _self = this,
				body = _self.get('tbody');
			//_self._setHeaderChecked(true);
			S.each(body.rows, function (row) {
				_self._setRowSelected(row, selected);
			});
		},
		destory : function () {
		}
	});

	S.namespace('LP');
	S.LP.Grid = Grid;

	return Grid;
}, {
    requires : ["./buttonBar","./paggingBar","./loadMask"]
});
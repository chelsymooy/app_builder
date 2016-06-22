steal(
    // List your Controller's dependencies here:
    function () {
        System.import('appdev').then(function () {
            steal.import('appdev/ad',
                'appdev/control/control').then(function () {

                    // Namespacing conventions:
                    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
                    AD.Control.extend('opstools.BuildApp.DataTableVisibleFieldsPopup', {


                        init: function (element, options) {
                            var self = this;
                            options = AD.defaults({
                            }, options);
                            this.options = options;

                            // Call parent init
                            this._super(element, options);

                            this.data = {};

                            this.componentIds = {
                                fieldsList: 'ab-visible-fields-list'
                            };

                            this.initMultilingualLabels();
                            this.initWebixControls();
                        },

                        initMultilingualLabels: function () {
                            var self = this;
                            self.labels = {};
                            self.labels.common = {};
                            self.labels.visible_fields = {};

                            self.labels.visible_fields.showAll = AD.lang.label.getLabel('ab.visible_fields.showAll') || "Show all";
                            self.labels.visible_fields.hideAll = AD.lang.label.getLabel('ab.visible_fields.hideAll') || "Hide all";
                        },

                        initWebixControls: function () {
                            var self = this;

                            webix.protoUI({
                                name: "visible_fields_popup",
                                $init: function (config) {
                                },
                                defaults: {
                                    body: {
                                        rows: [
                                            {
                                                cols: [
                                                    {
                                                        view: 'button',
                                                        value: self.labels.visible_fields.showAll,
                                                        click: function () {
                                                            self.dataTable.eachColumn(function (cId) {
                                                                self.dataTable.showColumn(cId);
                                                            }, true);

                                                            this.getTopParentView().callChangeEvent();
                                                        }
                                                    },
                                                    {
                                                        view: 'button',
                                                        value: self.labels.visible_fields.hideAll,
                                                        click: function () {
                                                            var columns = [];

                                                            self.dataTable.config.columns.forEach(function (c) {
                                                                if (c.id != 'appbuilder_trash')
                                                                    columns.push(c.id);
                                                            });

                                                            columns.forEach(function (c) {
                                                                self.dataTable.hideColumn(c);
                                                            });

                                                            this.getTopParentView().callChangeEvent();
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                view: 'list',
                                                id: self.componentIds.fieldsList,
                                                autoheight: true,
                                                select: false,
                                                template: '<span style="min-width: 18px; display: inline-block;"><i class="fa fa-circle ab-visible-field-icon"></i>&nbsp;</span> #label#',
                                                on: {
                                                    onItemClick: function (id, e, node) {
                                                        var item = this.getItem(id),
                                                            dataTable = self.dataTable;

                                                        if (dataTable.isColumnVisible(id))
                                                            dataTable.hideColumn(id);
                                                        else
                                                            dataTable.showColumn(id);

                                                        this.getTopParentView().callChangeEvent();
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    on: {
                                        onShow: function () {
                                            // Initial show/hide icon
                                            $('.ab-visible-field-icon').hide();

                                            for (key in self.dataTable.config.columns) {
                                                var c = self.dataTable.config.columns[key];
                                                $($$(self.componentIds.fieldsList).getItemNode(c.id)).find('.ab-visible-field-icon').show();
                                            };
                                        }
                                    }
                                },

                                registerDataTable: function (dataTable) {
                                    self.dataTable = dataTable;
                                },

                                setFieldList: function (fieldList) {
                                    // We can remove it when we can get all column from webix datatable (include hidden fields)
                                    self.data.fieldList = fieldList;

                                    this.bindFieldList();
                                },

                                bindFieldList: function () {
                                    $$(self.componentIds.fieldsList).clearAll();
                                    $$(self.componentIds.fieldsList).parse(this.getFieldList());
                                },

                                getFieldList: function () {
                                    var result = [];

                                    // Get all columns include hidden columns
                                    if (self.data.fieldList) {
                                        self.data.fieldList.forEach(function (f) {
                                            result.push({
                                                id: f.name,
                                                label: f.label
                                            });
                                        });
                                    }

                                    return result;
                                },

                                callChangeEvent: function () {
                                    var hiddenNumber = 0;

                                    self.dataTable.eachColumn(function (cId) {
                                        if (!self.dataTable.isColumnVisible(cId))
                                            hiddenNumber++;
                                    }, true);

                                    this.getTopParentView().callEvent('onChange', [hiddenNumber]);
                                },

                                showField: function (id) {
                                    self.dataTable.showColumn(id);

                                    $($$(self.componentIds.fieldsList).getItemNode(id)).find('.ab-visible-field-icon').show();

                                    this.getTopParentView().callChangeEvent();
                                },

                                hideField: function (id) {
                                    self.dataTable.hideColumn(id);

                                    $($$(self.componentIds.fieldsList).getItemNode(id)).find('.ab-visible-field-icon').hide();

                                    this.getTopParentView().callChangeEvent();
                                }

                            }, webix.ui.popup);

                        },

                    });
                });
        });
    }
);
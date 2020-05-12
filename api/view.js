/**
 * A view is typically docked in the main document area of the Grok platform.
 * See [TableView], [SketchView], etc
 */
class View {
    constructor(d) { this.d = d; }

    static fromDart(d) {
        let type = grok_View_Get_Type(d);
        if (type === VIEW_TYPE_TABLE_VIEW)
            return new TableView(d);
        else
            return new View(d);

    }
    static create() { let v = new View(grok_View()); ui._class(v.root, 'grok-default-view'); return v; }

    get root() { return grok_View_Get_Root(this.d); }

    append(x) { return ui.appendAll(this.root, [x]); }
    appendAll(x) { return ui.appendAll(this.root, x); }

    get type() { return grok_View_Get_Type(this.d); }

    get name() { return grok_View_Get_Name(this.d); }
    set name(s) { return grok_View_Set_Name(this.d, s); }

    get path() { return grok_View_Get_Path(this.d); }
    set path(s) { return grok_View_Set_Path(this.d, s); }

    get basePath() { return grok_View_Get_BasePath(this.d); }
    set basePath(s) { return grok_View_Set_BasePath(this.d, s); }

    get description() { return grok_View_Get_Description(this.d); }
    set description(s) { return grok_View_Set_Description(this.d, s); }

    get viewType() { return grok_View_Get_Type(this.d); }
    get table() { return new DataFrame(grok_View_Get_Table(this.d)); }

    get toolbox() { return grok_View_Get_Toolbox(this.d); }
    set toolbox(x) { return grok_View_Set_Toolbox(this.d, x); }

    get ribbonMenu() { return new Menu(grok_View_Get_RibbonMenu(this.d)); }
    set ribbonMenu(menu) { grok_View_Set_RibbonMenu(this.d, menu.d); }

    loadLayout(layout) { return grok_View_Load_Layout(this.d, layout.d);  }
    saveLayout() { return new ViewLayout(grok_View_Save_Layout(this.d)); }

    setRibbonPanels(panels) { grok_View_SetRibbonPanels(this.d, panels); }

    addViewer(viewerType, options = null) {
        let v = new Viewer(grok_View_AddViewer(this.d, viewerType));
        if (options !== null)
            v.options(options);
        return v;
    }

    close() { grok_View_Close(this.d); }
}


class TableView extends View {
    constructor(d) { super(d); }

    get grid() { return new Grid(grok_View_Get_Grid(this.d)); }

    get dataFrame() { return new DataFrame(grok_View_Get_DataFrame(this.d)); }
    set dataFrame(x) { grok_View_Set_DataFrame(this.d, x.d); }

    get toolboxPage() { return new ToolboxPage(grok_View_Get_ToolboxPage(this.d)); }

    histogram      (options = null) { return this.addViewer(VIEWER_HISTOGRAM, options); }
    barChart       (options = null) { return this.addViewer(VIEWER_BAR_CHART, options); }
    boxPlot        (options = null) { return this.addViewer(VIEWER_BOX_PLOT, options); }
    calendar       (options = null) { return this.addViewer(VIEWER_CALENDAR, options); }
    corrPlot       (options = null) { return this.addViewer(VIEWER_CORR_PLOT, options); }
    densityPlot    (options = null) { return this.addViewer(VIEWER_DENSITY_PLOT, options); }
    filters        (options = null) { return this.addViewer(VIEWER_FILTERS, options); }
    form           (options = null) { return this.addViewer(VIEWER_FORM, options); }
    globe          (options = null) { return this.addViewer(VIEWER_GLOBE, options); }
    googleMap      (options = null) { return this.addViewer(VIEWER_GOOGLE_MAP, options); }
    heatMap        (options = null) { return this.addViewer(VIEWER_HEAT_MAP, options); }
    lineChart      (options = null) { return this.addViewer(VIEWER_LINE_CHART, options); }
    shapeMap       (options = null) { return this.addViewer(VIEWER_SHAPE_MAP, options); }
    markup         (options = null) { return this.addViewer(VIEWER_MARKUP, options); }
    matrixPlot     (options = null) { return this.addViewer(VIEWER_MATRIX_PLOT, options); }
    networkDiagram (options = null) { return this.addViewer(VIEWER_NETWORK_DIAGRAM, options); }
    pcPlot         (options = null) { return this.addViewer(VIEWER_PC_PLOT, options); }
    pieChart       (options = null) { return this.addViewer(VIEWER_PIE_CHART, options); }
    scatterPlot    (options = null) { return this.addViewer(VIEWER_SCATTER_PLOT, options); }
    scatterPlot3d  (options = null) { return this.addViewer(VIEWER_SCATTER_PLOT_3D, options); }
    statistics     (options = null) { return this.addViewer(VIEWER_STATISTICS, options); }
    tileViewer     (options = null) { return this.addViewer(VIEWER_TILE_VIEWER, options); }
    treeMap        (options = null) { return this.addViewer(VIEWER_TREE_MAP, options); }
    trellisPlot    (options = null) { return this.addViewer(VIEWER_TRELLIS_PLOT, options); }
    wordCloud      (options = null) { return this.addViewer(VIEWER_WORD_CLOUD, options); }

    resetLayout() { grok_View_ResetLayout(this.d); }

    detach() { grok_View_Detach(this.d); }
    detachViewers() { grok_View_DetachViewers(this.d); }
}


class DataSourceCardView extends View {
    set searchValue(s) { return grok_DataSourceCardView_Set_SearchValue(this.d, s); }
    get permanentFilter() { return grok_DataSourceCardView_Get_PermanentFilter(this.d); }
    set permanentFilter(s) { return grok_DataSourceCardView_Set_PermanentFilter(this.d, s); }
}


class ProjectsView extends DataSourceCardView {
    static create(params) { return new ProjectsView(grok_ProjectsView(params)); }
}


class ViewLayout {
    constructor(d) { this.d = d; }

    static fromJson(json) { return new ViewLayout(grok_ViewLayout_FromJson(json)); }

    toJson() { return grok_ViewLayout_ToJson(this.d); }
}


class VirtualView {
    constructor(d) { this.d = d; }

    static create() { return new VirtualView(grok_VirtualItemView()); }

    get root() { return grok_VirtualItemView_Get_Root(this.d); }
    setData(length, renderer) { grok_VirtualItemView_SetData(this.d, length, renderer); }
}


/** A viewer that is typically docked inside a [TableView]. */
class Viewer {
    constructor(d) { this.d = d; }

    static fromType(viewerType, table, options = null) {
        return new Viewer(grok_Viewer_FromType(viewerType, table.d, _toJson(options)));
    }

    options(map) { grok_Viewer_Options(this.d, JSON.stringify(map)); }
    close() { grok_Viewer_Close(this.d); }
    serialize()  { return grok_Viewer_Serialize(this.d); }

    get root() { return grok_Viewer_Root(this.d); }

    static grid        (t, options = null) { return new Viewer(grok_Viewer_Grid(t.d, _toJson(options))); }
    static histogram   (t, options = null) { return new Viewer(grok_Viewer_Histogram(t.d, _toJson(options))); }
    static barChart    (t, options = null) { return Viewer.fromType(VIEWER_BAR_CHART, t, options);  }
    static boxPlot     (t, options = null) { return new Viewer(grok_Viewer_BoxPlot(t.d, _toJson(options)));  }
    static filters     (t, options = null) { return new Viewer(grok_Viewer_Filters(t.d, _toJson(options))); }
    static scatterPlot (t, options = null) { return new Viewer(grok_Viewer_ScatterPlot(t.d, _toJson(options))); }
}


class JsLookAndFeel {
    constructor() {
        return new Proxy(this, {
            set(target, name, value) {
                target.table.set(name, target.idx, value);
                return true;
            },
            get(target, name) {
                return target.table.get(name, target.idx);
            }
        });
    }

    get(name) { return null; }
}


/** JavaScript implementation of the grok viewer */
class JsViewer {
    constructor() {
        this.root = ui.div();
        this.properties = [];
        this.dataFrameHandle = null;
        this.dataFrame = null;
    }

    onFrameAttached(dataFrameHandle) {}
    onPropertyChanged(property) {}

    getProperties() { return this.properties; }
    getDartProperties() {
        return this.getProperties().map((p) => p.d);
    }

    /** cleanup() will get called when the viewer is disposed **/
    registerCleanup(cleanup) { grok_Widget_RegisterCleanup(this.root, cleanup); }

    _prop(name, type, value = null) {
        let obj = this;
        let p = Property.create(name, type, () => obj[name], null, value);
        p.set = function(_, x) {
            //console.log("xo");
            obj[name] = x;
            obj.onPropertyChanged(p);
        };

        this.properties.push(p);
        return p.defaultValue;
    }

    column(name) { return this._prop(name, TYPE_COLUMN); }

    int(name, value = null) { return this._prop(name, TYPE_INT, value); }
    float(name, value = null) { return this._prop(name, TYPE_FLOAT, value); }
    string(name, value = null) { return this._prop(name, TYPE_STRING, value); }
    bool(name, value = null) { return this._prop(name, TYPE_BOOL, value); }
    dateTime(name, value = null) { return this._prop(name, TYPE_DATE_TIME, value); }
}
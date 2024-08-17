"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScrollViewDelegate = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class ScrollViewDelegate {
	constructor(e) {
		(this.Pe = []),
			(this.gWe = 0),
			(this.DGo = []),
			(this.RGo = []),
			(this.oNi = void 0),
			(this.UGo = void 0),
			(this.AGo = !1),
			(this.PGo = -1),
			(this.xGo = void 0),
			(this.oNi = e);
	}
	SetData(e) {
		this.ClearData(),
			(this.Pe = this.Pe.concat(e)),
			(this.gWe = this.Pe.length);
	}
	GetDatas() {
		return this.Pe;
	}
	SetDataProxy(e, t, o = !0) {
		this.ClearData(), (this.UGo = e), (this.gWe = t), (this.AGo = o);
	}
	OnGridsUpdate(e, t, o, i) {
		e >= this.gWe || t >= this.DGo.length
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"ScrollViewGrid",
					25,
					`参数值非法 gridIndex: ${e} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
						this.DGo.length,
				)
			: (-1 !== this.PGo &&
					(this.PGo < o || this.PGo > i) &&
					(this.xGo = void 0),
				(this.RGo[t] = !0),
				this.RefreshGridProxy(e, t));
	}
	RefreshGridProxy(e, t) {
		var o, i, r;
		e >= this.gWe || t >= this.DGo.length
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"ScrollViewGrid",
					25,
					`参数值非法 gridIndex: ${e} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
						this.DGo.length,
				)
			: (o = this.GetGridProxy(t))
				? ((i = -1 !== e && e === this.PGo) && !this.xGo && (this.xGo = o),
					(r = this.wGo(e, t)),
					(o.GridIndex = e),
					(o.DisplayIndex = t),
					o.Refresh(r, i, e))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ScrollViewGrid",
						25,
						`Proxy获取异常 gridIndex: ${e} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
							this.DGo.length,
					);
	}
	wGo(e, t) {
		let o;
		return (
			!(o = this.Pe.length > e ? this.Pe[e] : o) &&
				this.UGo &&
				((o = this.UGo(e)), this.AGo) &&
				(this.Pe[e] = o),
			o
		);
	}
	TryGetCachedData(e) {
		if (this.Pe.length > e) return this.Pe[e];
	}
	CreateGridProxy(e, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"ScrollViewGrid",
				25,
				`CreateProxy displayIndex: ${e}, Proxies.length: ` + this.DGo.length,
			);
		var o = this.DGo[e];
		return (
			o
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("ScrollViewGrid", 25, "Proxy已经存在", [
						"DisplayIndex",
						e,
					])
				: ((o = this.oNi()).CreateThenShowByActor(t),
					(this.DGo[e] = o),
					(this.RGo[e] = !1),
					(o.ScrollViewDelegate = this)),
			o
		);
	}
	async CreateGridProxyAsync(e, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"ScrollViewGrid",
				44,
				`CreateProxy displayIndex: ${e}, Proxies.length: ` + this.DGo.length,
			);
		var o = this.DGo[e];
		return (
			o
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ScrollViewGrid",
						44,
						"Proxy已经存在 displayIndex: ",
						["displayIndex", e],
					)
				: ((((o = this.oNi()).ScrollViewDelegate = this).DGo[e] = o),
					(this.RGo[e] = !1),
					await o.CreateThenShowByActorAsync(t),
					(this.RGo[e] = !0)),
			o
		);
	}
	GetGridProxy(e) {
		if (this.RGo.length < e || !this.RGo[e])
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"ScrollViewGrid",
					25,
					"获取Proxy非法，请检查初始动画是否尚未播放完成。displayIndex: " + e,
				);
		else {
			var t = this.DGo[e];
			if (t) return t;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("ScrollViewGrid", 25, "无法获取Proxy", [
					"DisplayIndex",
					e,
				]);
		}
	}
	ClearGridProxy(e, t) {
		(t = this.GetGridProxy(t)) && t.Clear();
	}
	SelectGridProxy(e, t, o) {
		this.PGo !== e &&
			(this.DeselectCurrentGridProxy(o),
			(t = this.GetGridProxy(t)) && (t.OnSelected(o), (this.xGo = t)),
			(this.PGo = e));
	}
	DeselectCurrentGridProxy(e) {
		(this.PGo = -1),
			this.xGo && (this.xGo.OnDeselected(e), (this.xGo = void 0));
	}
	ClearSelectInfo() {
		(this.PGo = -1), (this.xGo = void 0);
	}
	GetSelectedProxy() {
		return this.xGo;
	}
	GetSelectedGridIndex() {
		return this.PGo;
	}
	GetDataLength() {
		return this.gWe;
	}
	IsProxyValid(e) {
		return e < this.RGo.length && this.RGo[e];
	}
	ClearData() {
		0 < this.Pe.length && (this.Pe.length = 0), (this.gWe = 0);
	}
	Destroy() {
		this.ClearData(),
			this.DGo.forEach((e) => {
				e.ScrollViewDelegate = void 0;
			}),
			(this.DGo.length = 0),
			(this.RGo.length = 0),
			(this.oNi = void 0),
			(this.UGo = void 0);
	}
}
exports.ScrollViewDelegate = ScrollViewDelegate;

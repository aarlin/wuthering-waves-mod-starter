"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ListSliderControl = exports.SliderItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LOAD_LIMIT_TIME = 2e3;
class SliderItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.AddShowTimeInternal = 0),
			(this.hgi = 0),
			(this.FinishPlayStart = () => {
				(this.hgi = 2), this.PlayHalfway();
			}),
			(this.FinishPlayHalfway = () => {}),
			(this.FinishPlayEnd = () => {
				this.hgi = 4;
			});
	}
	get AddShowTime() {
		return this.AddShowTimeInternal;
	}
	set AddShowTime(i) {
		this.AddShowTimeInternal = i;
	}
	get Status() {
		return this.hgi;
	}
	set Status(i) {
		this.hgi = i;
	}
	async AsyncLoadUiResource() {}
	InitData() {}
	Play() {
		(this.hgi = 1), (this.AddShowTime = 0), this.PlayStart();
	}
	PlayStart() {}
	PlayHalfway() {}
	PlayEnd() {}
	Tick(i) {
		this.OnTick(i);
	}
	ActiveStatusChange(i) {
		this.OnActiveStatusChange(i);
	}
	OnActiveStatusChange(i) {}
	OnTick(i) {}
	ShowTimeIsEnough(i) {
		return this.AddShowTime >= i;
	}
}
exports.SliderItem = SliderItem;
class ListSliderControl {
	constructor(i, t, s, e, h, g, o = 1, n = void 0, r = void 0) {
		(this.lgi = void 0),
			(this._gi = void 0),
			(this.eGe = void 0),
			(this.ugi = void 0),
			(this.cgi = 0),
			(this.mgi = new Array()),
			(this.dgi = new Array()),
			(this.Cgi = 0),
			(this.ggi = 0),
			(this.fgi = void 0),
			(this.pgi = 0),
			(this.vgi = 0),
			(this.Mgi = 0),
			(this.Sgi = !1),
			(this.Egi = 0),
			(this.ygi = 0),
			(this.IsFinish = !1),
			(this.xNt = void 0),
			(this.rgi = void 0),
			(this.sgi = void 0),
			(this.Igi = void 0),
			(this.Tgi = void 0),
			(this.hn = 0),
			(this.lgi = i),
			(this.ugi = t),
			(this.cgi = this.ugi.GetHeight()),
			this.ugi.SetUIActive(!1),
			(this._gi = this.ugi.GetParentAsUIItem()),
			(this.Sgi = this._gi.IsUIActiveInHierarchy()),
			(this.eGe = this._gi
				.GetOwner()
				.GetComponentByClass(UE.UIVerticalLayout.StaticClass())),
			void 0 === s
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ItemHint",
						9,
						"ListSliderControl错误, getMaxCount回调不能为undefined",
					)
				: ((this.xNt = s),
					(this.rgi = e),
					(this.sgi = h),
					(this.Igi = g),
					(this.fgi = o),
					(this.pgi = 0),
					(this.Cgi =
						n ?? ConfigManager_1.ConfigManager.RewardConfig.GetShowTime()),
					(this.ggi =
						r ?? ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime()),
					(this.ygi = s()));
	}
	DisEnableParentLayout() {
		this._gi
			? this.eGe
				? this.eGe.SetEnable(!1)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ItemHint",
						9,
						"ListSliderControl错误, 父节点不包含UIVerticalLayout组件",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"ItemHint",
					9,
					"ListSliderControl错误, ParentUiItem为undefined",
				);
	}
	Tick(i) {
		if ((this.Lgi(), this.Dgi(), this.Sgi)) {
			if (this.mgi.length <= 0 && !this.rgi())
				return this.IsFinish
					? void 0
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"ItemHint",
								11,
								"[ListSliderControl::Tick]已播放完毕,执行结束回调",
							),
						(this.IsFinish = !0),
						void this.Igi());
			this.IsFinish && (this.IsFinish = !1);
			let t = i,
				s = (t > TimerSystem_1.MIN_TIME && (t = TimerSystem_1.MIN_TIME), 0),
				e = 0;
			for (const i of this.mgi)
				this.Rgi(i, s),
					this.SliderItemTick(i, t, s),
					s++,
					(0 !== this.fgi || i.Status < 3) && e++;
			if ((this.Ugi(t), this.Agi(), !(e > this.ygi))) {
				if (
					(this.Egi !== e && ((this.Egi = e), this.Pgi()),
					1 === this.hn &&
						this.vgi > 2e3 &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"ItemHint",
								11,
								"[ListSliderControl::Tick]异步加载格子时间过长,重置状态",
							),
						(this.Tgi.Status = 5),
						(this.Tgi = void 0),
						(this.hn = 0),
						(this.vgi = 0)),
					!this.rgi())
				)
					return 1 === this.hn
						? void (this.vgi += t)
						: void (
								2 === this.hn &&
								(Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"ItemHint",
										11,
										"[ListSliderControl::Tick]检查不到下个对象,执行缓存对象逻辑,到None",
									),
								this.Tgi.SetActive(!0),
								this.Tgi.Play(),
								(this.Tgi = void 0),
								(this.hn = 0),
								(this.vgi = 0))
							);
				(i = this.sgi()),
					this.vgi >= i &&
						2 === this.hn &&
						(this.Tgi &&
							(this.Tgi.SetActive(!0), this.Tgi.Play(), (this.Tgi = void 0)),
						(this.vgi = 0),
						(this.hn = 0),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"ItemHint",
							11,
							"[ListSliderControl::Tick]资源使用完成,到None",
						),
					0 === this.hn &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"ItemHint",
								11,
								"[ListSliderControl::Tick]资源正在加载中,到Loading",
							),
						(this.hn = 1),
						this.xgi().then((i) => {
							(this.Tgi = i),
								this.Tgi.AsyncLoadUiResource().then(
									() => {
										this.Tgi &&
											(this.Tgi.InitData(),
											this.Tgi.SetActive(!1),
											(this.hn = 2),
											Log_1.Log.CheckInfo()) &&
											Log_1.Log.Info(
												"ItemHint",
												11,
												"[ListSliderControl::Tick]资源开始完成,到Loaded",
											);
									},
									() => {
										(this.Tgi.Status = 5),
											(this.Tgi = void 0),
											(this.hn = 0),
											(this.vgi = 0),
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"ItemHint",
													11,
													"[ListSliderControl::Tick]异步加载格子失败,到None",
												);
									},
								);
						})),
					(this.vgi += t);
			}
		}
	}
	Lgi() {
		var i = this._gi.IsUIActiveInHierarchy();
		if (i !== this.Sgi) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("ItemHint", 9, "滑动状态变化", ["activeStatus", i]),
				(this.Sgi = i);
			for (const t of this.mgi) t.ActiveStatusChange(i);
		}
	}
	Dgi() {
		var i = this.xNt();
		if (
			i !== this.ygi &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"ItemHint",
					11,
					"[ListSliderControl::Tick]最大数量发生变化",
				),
			(this.ygi = i),
			0 === this.sgi())
		)
			for (const i of this.mgi) i.AddShowTime = 0;
	}
	Rgi(i, t) {
		(i = i.GetRootItem()),
			(t =
				-this.Mgi -
				this.eGe.Padding.Top -
				0.5 * this.cgi -
				(t + this.pgi) * (this.cgi + this.eGe.Spacing)),
			i.SetAnchorOffsetY(t);
	}
	SliderItemTick(i, t, s) {
		i.Tick(t),
			2 === i.Status && (i.AddShowTime += t),
			(0 !== this.fgi && 0 !== s) ||
				(4 === i.Status
					? (i.Status = 5)
					: 2 === i.Status &&
						i.AddShowTime >= this.Cgi &&
						((i.Status = 3), i.PlayEnd(), 0 === this.fgi) &&
						(this.pgi--, this.wgi()));
	}
	async xgi() {
		let i;
		var t;
		return (
			0 < this.dgi.length
				? (i = this.dgi.shift())
				: ((t = LguiUtil_1.LguiUtil.CopyItem(this.ugi, this._gi)),
					await (i = new this.lgi()).CreateByActorAsync(t.GetOwner())),
			this.mgi.push(i),
			i
		);
	}
	Ugi(i) {
		this.Mgi <= 0 ||
			((this.Mgi -= (this.cgi / this.ggi) * i), 0 < this.Mgi) ||
			(this.Mgi = 0);
	}
	Agi() {
		for (var i = this.mgi; !(i.length <= 0); ) {
			var t = i[0];
			if (5 !== t.Status) return;
			(t.Status = 0),
				i.shift(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"ItemHint",
						11,
						"[ListSliderControl::RecycleItem]对象进行回收",
						["当前剩余数量", i.length],
					),
				t.SetActive(!1),
				this.dgi.push(t),
				1 === this.fgi ? this.wgi() : 0 === this.fgi && this.pgi++;
		}
	}
	wgi() {
		this.Mgi += this.cgi + this.eGe.Spacing;
	}
	DestroyMe() {
		this.eGe && this.eGe.SetEnable(!0);
		for (const i of this.mgi) i.Destroy();
		this.mgi = void 0;
		for (const i of this.dgi) i.Destroy();
		this.dgi = void 0;
	}
	Pgi() {
		this._gi.SetHeight(this.Egi * this.cgi);
	}
}
exports.ListSliderControl = ListSliderControl;

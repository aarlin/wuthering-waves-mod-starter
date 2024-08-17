"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeView = void 0);
const UE = require("ue"),
	Json_1 = require("../../../../Core/Common/Json"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	SignalDecodeGamePlayById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeGamePlayById"),
	SignalDecodeTabColorById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeTabColorById"),
	SignalDecodeWaveformById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeWaveformById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	SignalDecodeTabItem_1 = require("./SignalDecodeTabItem"),
	ANIM_TIME = 1500,
	SLOT_OUTLINE_WIDTH = 3,
	SLOT_WIDTH = 60,
	SLOT_INTERVAL = 19,
	SLOT_PADDING_LEFT = 10,
	UNIT_HEIGHT = 100;
class SignalDecodeView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.OMo = ""),
			(this.kMo = void 0),
			(this.FMo = void 0),
			(this.VMo = void 0),
			(this.HMo = void 0),
			(this.jMo = void 0),
			(this.WMo = 0),
			(this.KMo = 0),
			(this.QMo = 0),
			(this.XMo = -0),
			(this.$Mo = -0),
			(this.k_t = 0),
			(this.YMo = 0),
			(this.JMo = !1),
			(this.cVe = 0),
			(this.zMo = 0),
			(this.ZMo = 0),
			(this.eSo = () => {
				if (
					this.VMo &&
					this.VMo.length &&
					!(TimeUtil_1.TimeUtil.GetServerTime() - this.cVe <= this.zMo)
				) {
					this.cVe = TimeUtil_1.TimeUtil.GetServerTime();
					var e = this.VMo[0].GetAnchorOffsetX(),
						t = this.jMo.get(0);
					t = this.tSo(t);
					if (!((t = Math.abs(t - e)) > this.ZMo)) {
						for (let e = 0; e < this.VMo.length; e++) {
							var o = this.VMo[e];
							if (!o.IsUIActiveInHierarchy()) return;
							var i = this.jMo.get(e);
							i = this.tSo(i);
							o.SetAnchorOffsetX(i);
						}
						this.kMo[this.QMo - 1].SetComplete(),
							TimerSystem_1.TimerSystem.Delay(() => {
								for (const e of this.VMo) this.iSo(e);
								(this.VMo.length = 0), this.jMo.clear();
								var e = ++this.QMo;
								e <= 4 ? this.oSo(e) : this.Gei(-1);
							}, 1e3 * this.zMo);
					}
				}
			}),
			(this.wvo = () => {
				UiManager_1.UiManager.CloseView("SignalDecodeView");
			}),
			(this.rSo = () => {
				GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(
					Protocol_1.Aki.Protocol.dqs.Proto_SignalBreak,
					this.OMo,
				),
					UiManager_1.UiManager.CloseView("SignalDecodeView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UITexture],
			[10, UE.UITexture],
			[11, UE.UITexture],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.eSo],
				[4, this.wvo],
			]);
	}
	OnStart() {
		this.GetItem(5).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1);
		var e = this.GetTexture(11);
		(this.WMo = e.GetWidth()), (e = this.GetSprite(2));
		(this.FMo = []),
			this.FMo.push(e),
			(this.VMo = []),
			(this.HMo = []),
			(this.jMo = new Map()),
			(this.QMo = 1),
			(this.k_t = 0),
			(this.XMo = 0),
			(this.$Mo = 0),
			(this.cVe = 0),
			(this.zMo =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"SignalDecodeFailStopTime",
				) ?? 0.8),
			(this.ZMo =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"SignalDecodeSuccessRange",
				) ?? 50),
			(this.OMo = this.OpenParam),
			this.OMo &&
				((e =
					SignalDecodeGamePlayById_1.configSignalDecodeGamePlayById.GetConfig(
						this.OMo,
					))
					? this._no(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Quest", 19, "找不到信号破译配置", [
							"id",
							this.OMo,
						]));
	}
	OnAfterShow() {
		this.Gei(++this.k_t);
	}
	OnTick(e) {
		(this.$Mo += e), this.nSo(), this.sSo(e), (this.XMo = this.$Mo);
	}
	nSo() {
		this.$Mo > 1500 &&
			this.XMo <= 1500 &&
			(this.Gei(++this.k_t), (this.$Mo = 0), (this.XMo = 0));
	}
	sSo(e) {
		if (
			((this.JMo = TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > this.zMo),
			this.VMo && 0 !== this.VMo.length && this.JMo)
		)
			for (const o of this.VMo) {
				var t = o.GetAnchorOffsetX();
				(t =
					(o.SetAnchorOffsetX(t + (e / 1e3) * 250 * this.KMo),
					o.GetAnchorOffsetX())) >= this.WMo &&
					(o.SetAnchorOffsetX(t - this.WMo - 85), o.SetUIActive(!0));
			}
	}
	Gei(e) {
		switch (e) {
			case 1:
				this.GetItem(5).SetUIActive(!0);
				break;
			case 2:
				this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!0);
				break;
			case 3:
				this.GetItem(6).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!0),
					this.oSo(this.QMo);
				break;
			case -1:
				this.GetItem(7).SetUIActive(!1),
					this.GetItem(8).SetUIActive(!0),
					TimerSystem_1.TimerSystem.Delay(this.rSo, 1e3);
		}
	}
	_no(e) {
		var t, o, i;
		e.SignalData1
			? ((this.kMo = []),
				(i = this.GetItem(1)),
				(t = this.GetItem(0)),
				(o = new SignalDecodeTabItem_1.SignalDecodeTabItem(
					1,
					e.SignalData1,
					i,
				)),
				this.kMo.push(o),
				i.SetUIActive(!0),
				e.SignalData2 &&
					((o = LguiUtil_1.LguiUtil.CopyItem(i, t)),
					(o = new SignalDecodeTabItem_1.SignalDecodeTabItem(
						2,
						e.SignalData2,
						o,
					)),
					this.kMo.push(o)),
				e.SignalData3 &&
					((o = LguiUtil_1.LguiUtil.CopyItem(i, t)),
					(o = new SignalDecodeTabItem_1.SignalDecodeTabItem(
						3,
						e.SignalData3,
						o,
					)),
					this.kMo.push(o)),
				e.SignalData4 &&
					((o = LguiUtil_1.LguiUtil.CopyItem(i, t)),
					(i = new SignalDecodeTabItem_1.SignalDecodeTabItem(
						4,
						e.SignalData4,
						o,
					)),
					this.kMo.push(i)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Quest", 19, "找不到信号1", ["id", this.OMo]);
	}
	oSo(e) {
		var t, o, i;
		this.kMo &&
			0 !== this.kMo.length &&
			((t = this.kMo[e - 1].WaveformId),
			(o =
				SignalDecodeWaveformById_1.configSignalDecodeWaveformById.GetConfig(t))
				? (i =
						SignalDecodeTabColorById_1.configSignalDecodeTabColorById.GetConfig(
							e,
						))
					? (this.aSo(i), this.hSo(i), this.lSo(o), this._So(o, i), this.uSo())
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Quest", 19, "找不到信号破译页签的颜色配置", [
							"tabIndex",
							e,
						])
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "找不到信号谱面配置", ["id", t]));
	}
	aSo(e) {
		for (const t of this.kMo) t.UpdateColor(e), t.OnProcess(this.QMo);
	}
	hSo(e) {
		this.GetTexture(9).SetColor(UE.Color.FromHex(e.VacancyColor)),
			this.GetTexture(10).SetColor(UE.Color.FromHex(e.VacancyColor)),
			this.GetTexture(11).SetColor(UE.Color.FromHex(e.DefaultColor));
	}
	lSo(e) {
		const t = this.GetSprite(2),
			o = t.GetParentAsUIItem();
		(this.KMo = e.SpeedRate),
			Json_1.Json.Parse(e.SignalFragment).forEach((e, i) => {
				let s;
				i < this.FMo.length
					? (s = this.FMo[i])
					: ((s = this.cSo(t, o)), this.FMo.push(s)),
					(i = this.tSo(i)),
					s.SetAnchorOffsetX(i),
					s.SetHeight(100 * e);
			});
	}
	_So(e, t) {
		var o = this.GetItem(12),
			i = Json_1.Json.Parse(e.MissingParts);
		this.YMo = e.Offset;
		for (let e = i.length - 1; 0 <= e; --e) {
			var s,
				r = 1 === i[e],
				h = this.FMo[e];
			r
				? (h.SetUIActive(!0),
					h.SetColor(UE.Color.FromHex(t.VacancyColor)),
					(r = this.mSo(h, o)).SetColor(UE.Color.FromHex(t.HighlightColor)),
					(s = this.tSo(e)),
					r.SetAnchorOffsetX(s),
					this.VMo.push(r),
					this.jMo.set(this.VMo.length - 1, e),
					this.YMo > this.VMo.length && r.SetUIActive(!1))
				: h.SetUIActive(!1);
		}
	}
	uSo() {
		var e = this.jMo.get(this.YMo),
			t = this.tSo(e + 1);
		for (const e of this.VMo) {
			var o = e.GetAnchorOffsetX();
			e.SetAnchorOffsetX(o - t);
		}
	}
	tSo(e) {
		return 85 * e + 10 + 3;
	}
	mSo(e, t) {
		return 0 === this.HMo.length
			? this.cSo(e, t)
			: ((t = this.HMo.pop()).SetHeight(e.GetHeight()), t);
	}
	cSo(e, t) {
		return LguiUtil_1.LguiUtil.DuplicateActor(
			e.GetOwner(),
			t,
		).GetComponentByClass(UE.UISprite.StaticClass());
	}
	iSo(e) {
		e.SetAnchorOffsetX(-1e4), this.HMo.push(e);
	}
}
exports.SignalDecodeView = SignalDecodeView;

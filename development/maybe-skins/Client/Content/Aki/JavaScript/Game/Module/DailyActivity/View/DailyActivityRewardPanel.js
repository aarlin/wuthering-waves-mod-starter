"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyActivityRewardPanel = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	DailyActivityRewardItem_1 = require("./DailyActivityRewardItem"),
	PROGRESS_ANIMATE_TIME = 0.5,
	REWARD_WIDTH = 120;
class DailyActivityRewardPanel extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.DFe = void 0),
			(this.ekt = void 0),
			(this.qte = 0),
			(this.BY = 0),
			(this.tkt = 0),
			(this.ikt = 0),
			(this.okt = !1),
			(this.rkt = -0),
			(this.nkt = []),
			(this.skt = []),
			(this.akt = 0),
			(this.hkt = 0),
			(this.lkt = 0),
			(this._kt = 0),
			(this.ukt = 0),
			(this.ckt = (t) => {
				for (const e of t) this.sqe(e);
			}),
			(this.mkt = () => {
				var t = this.GetSprite(2),
					e = this.GetItem(1),
					i = this.GetItem(5),
					s = this.GetSprite(6);
				return (
					LguiUtil_1.LguiUtil.CopyItem(s, i),
					LguiUtil_1.LguiUtil.CopyItem(t, e),
					new DailyActivityRewardItem_1.DailyActivityRewardItem()
				);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UISprite],
		];
	}
	OnStart() {
		this.DFe = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(3),
			this.mkt,
		);
		var t = this.GetItem(0);
		(this.hkt = t.GetWidth()),
			(this.ekt = this.GetItem(0)),
			this.AddEventListener();
	}
	OnBeforeDestroy() {
		(this.ekt = void 0), (this.nkt = void 0), this.RemoveEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.DailyActivityRewardTake,
			this.ckt,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.DailyActivityRewardTake,
			this.ckt,
		);
	}
	Init() {
		var t = ModelManager_1.ModelManager.DailyActivityModel,
			e = t.DailyActivityGoalMap,
			i = ((this.qte = t.ActivityValue), (this.BY = t.ActivityMaxValue), []);
		this.akt = 0;
		for (const t of e.values()) 2 !== t.State && this.akt++, i.push(t.Id);
		(this.ukt = i.length),
			this.ukt <= 0 ||
				((this.skt = i),
				this.DFe.RefreshByData(i),
				this.GetSprite(2).SetUIActive(!1),
				this.GetSprite(6).SetUIActive(!1),
				(this.lkt = 120),
				(this._kt = (this.hkt - this.lkt * (this.ukt - 1)) / this.ukt),
				this.dkt(this.qte / this.BY));
	}
	GetRewardItemByIndex(t) {
		return this.DFe.GetItemByIndex(t);
	}
	Ckt() {
		let t = 0;
		for (const e of this.DFe.GetLayoutItemList())
			e.RefreshSelf(), 2 !== e.DailyActiveState && t++;
		this.akt = t;
	}
	sqe(t) {
		(t = this.skt.indexOf(t)) < 0 ||
			this.DFe.GetLayoutItemList()[t].RefreshSelf();
	}
	gkt(t) {
		var e;
		0 !== this.nkt.length &&
			(e = this.nkt[0])[0] <= t &&
			(this.sqe(e[1]), this.nkt.shift(), this.akt++);
	}
	OnTickRefresh(t) {
		this.okt &&
			((this.rkt += t * TimeUtil_1.TimeUtil.Millisecond),
			(t = MathUtils_1.MathUtils.Clamp(this.rkt / 0.5, 0, 1)),
			(this.qte = MathUtils_1.MathUtils.Lerp(this.ikt, this.tkt, t)),
			(t = MathUtils_1.MathUtils.Clamp(this.qte / this.BY, 0, 1)),
			this.gkt(this.qte),
			this.dkt(t),
			this.qte === this.tkt) &&
			this.fkt();
	}
	dkt(t) {
		var e = Math.min(this.akt, this.ukt - 1) * this.lkt;
		(t = this._kt * this.ukt * Math.min(t, 1)), (e = this.hkt - e - t);
		this.ekt.SetStretchRight(e);
	}
	pkt(t) {
		(this.tkt = t), (this.ikt = this.qte), (this.rkt = 0), (this.okt = !0);
	}
	fkt() {
		(this.okt = !1), (this.qte = this.tkt);
		var t = MathUtils_1.MathUtils.Clamp(this.tkt / this.BY, 0, 1);
		this.Ckt(), this.dkt(t);
	}
	RefreshProgressBarDynamic(t) {
		var e;
		t <= this.qte ||
			(this.okt && this.fkt(),
			(e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap),
			(this.nkt = []),
			e.forEach((e, i) => {
				this.qte < e.Goal && e.Goal <= t && this.nkt.push([e.Goal, i]);
			}),
			this.pkt(t));
	}
}
exports.DailyActivityRewardPanel = DailyActivityRewardPanel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarMorphCountDown = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../../Core/Common/Time"),
	SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle"),
	SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
	SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem"),
	pointNumList = [19, 20],
	TOTAL_NUM = 41,
	POINT_WIDTH = 9,
	EFFECT_DURATION = 500;
class SpecialEnergyBarMorphCountDown extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
	constructor() {
		super(...arguments),
			(this.pmt = void 0),
			(this.vmt = void 0),
			(this.Cmt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
			(this.fmt = 0),
			(this.Mmt = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UINiagara],
		];
	}
	async OnBeforeStartAsync() {
		5 === this.Config.PrefabType
			? (this.Mmt = pointNumList[0])
			: (this.Mmt = pointNumList[1]);
		var t = [];
		t.push(this.InitPointLeftItem(this.GetItem(0))),
			t.push(this.InitPointRightItem(this.GetItem(1))),
			await Promise.all(t);
	}
	async InitPointLeftItem(t) {
		(this.pmt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
			this.pmt.InitPrefabInfo(this.Mmt, 9),
			await this.pmt.CreateThenShowByActorAsync(t.GetOwner());
	}
	async InitPointRightItem(t) {
		(this.vmt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
			this.vmt.InitPrefabInfo(this.Mmt, 9),
			await this.vmt.CreateThenShowByActorAsync(t.GetOwner());
	}
	OnStart() {
		var t;
		this.Config &&
			((t = this.Mmt / 41),
			this.pmt.SetEffectBasePercent(t),
			this.vmt.SetEffectBasePercent(t),
			this.Config.EffectColor &&
				((t = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
				this.pmt.SetFullEffectColor(t, !0),
				this.vmt.SetFullEffectColor(t, !0)),
			this.Config.IconPath &&
				((t = [this.GetSprite(2)]),
				this.Cmt.Init(t),
				this.Cmt.SetIcon(this.Config.IconPath)),
			0 === this.fmt && this.GetUiNiagara(3).SetUIActive(!1),
			this.RefreshBarPercent());
	}
	OnChangeVisibleByTagChange(t) {
		t &&
			(this.GetUiNiagara(3).SetUIActive(!0),
			(this.fmt = 500 + Time_1.Time.Now));
	}
	OnBeforeShow() {
		9 === this.Config.PrefabType &&
			(this.GetUiNiagara(3).SetUIActive(!0),
			(this.fmt = 500 + Time_1.Time.Now));
	}
	RefreshBarPercent() {
		var t = this.PercentMachine.GetCurPercent();
		this.pmt.UpdatePercent(t),
			this.vmt.UpdatePercent(t),
			this.Cmt.PlayEndAnim(t < this.Config.ExtraFloatParams[0]);
	}
	OnBarPercentChanged() {
		this.RefreshBarPercent();
	}
	Tick(t) {
		super.Tick(t),
			this.pmt?.Tick(t),
			this.vmt?.Tick(t),
			0 < this.fmt &&
				this.fmt <= Time_1.Time.Now &&
				(this.GetUiNiagara(3).SetUIActive(!1), (this.fmt = 0));
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(), this.Cmt.OnBeforeDestroy();
	}
}
exports.SpecialEnergyBarMorphCountDown = SpecialEnergyBarMorphCountDown;

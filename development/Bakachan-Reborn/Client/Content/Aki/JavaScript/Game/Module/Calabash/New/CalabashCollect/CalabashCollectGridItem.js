"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashCollectGridItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PhantomBattleFettersViewItem_1 = require("../../../Phantom/PhantomBattle/View/PhantomBattleFettersViewItem"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CalabashCollectStarItem_1 = require("./CalabashCollectStarItem");
class CalabashCollectGridItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.sft = void 0),
			(this.$be = void 0),
			(this.CanToggleChange = void 0),
			(this.OnToggleClick = void 0),
			(this.zbe = () =>
				new CalabashCollectStarItem_1.CalabashCollectStarItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIHorizontalLayout],
		]),
			(this.BtnBindInfo = [
				[
					0,
					() => {
						this.OnToggleClick?.(this.GridIndex);
					},
				],
			]);
	}
	async OnBeforeStartAsync() {
		this.GetExtendToggle(0)?.CanExecuteChange.Bind(
			() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
		),
			(this.sft = new PhantomBattleFettersViewItem_1.VisionDetailMonsterItem()),
			await this.sft?.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
			this.sft.SetToggleInteractive(!1),
			(this.$be = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(4),
				this.zbe,
			));
	}
	Refresh(e, t, a) {
		var o = (this.Pe = e).DevelopRewardData.MonsterId,
			r = [];
		let i = 0;
		for (const e of ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(
			o,
		)) {
			var s = e.IsUnlock;
			r.push(s), s && i++;
		}
		e.UnlockData
			? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.SkillName)
			: ((o =
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
						o,
					).MonsterNumber),
				this.GetText(2)?.SetText(o + "???")),
			this.sft.Refresh(
				new PhantomBattleFettersViewItem_1.VisionDetailMonsterItemData(
					e.DevelopRewardData.MonsterId,
					i,
				),
			),
			this.$be?.RefreshByData(r),
			(o = t ? 1 : 0),
			this.GetExtendToggle(0)?.SetToggleStateForce(o),
			1 == o ? this.OnSelected(!1) : this.RefreshNewItem();
	}
	OnSelected(e) {
		this.Pe?.UnlockData &&
			(ModelManager_1.ModelManager.CalabashModel?.RecordMonsterId(
				this.Pe.DevelopRewardData.MonsterId,
			),
			this.RefreshNewItem()),
			this.GetExtendToggle(0).SetToggleState(1);
	}
	OnDeselected(e) {
		this.GetExtendToggle(0)?.SetToggleState(0);
	}
	RefreshNewItem() {
		var e = ModelManager_1.ModelManager.CalabashModel.CheckMonsterIdInRecord(
			this.Pe.DevelopRewardData.MonsterId,
		);
		this.GetItem(3).SetUIActive(this.Pe.UnlockData && !e);
	}
}
exports.CalabashCollectGridItem = CalabashCollectGridItem;

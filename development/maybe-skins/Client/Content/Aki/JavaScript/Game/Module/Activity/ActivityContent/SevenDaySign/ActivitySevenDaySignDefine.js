"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VersionSignRewardItem =
		exports.NormalRewardItem =
		exports.ImportantRewardItem =
		exports.SignRewardItemBase =
			void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class SignRewardItemBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Index = 0),
			(this.CanGetReward = !1),
			(this.OnClickToGet = void 0),
			(this.OnClickToggle = () => {
				this.OnClickToGet?.(this.Index);
			});
	}
	RefreshByData(e, t, i) {}
	GetRewardStateTextId(e) {
		switch (e) {
			case Protocol_1.Aki.Protocol.D0s.h3n:
				return "NeedSign";
			case Protocol_1.Aki.Protocol.D0s.j0s:
				return "CanGetReward";
			case Protocol_1.Aki.Protocol.D0s.qms:
				return "CollectActivity_state_recived";
			default:
				return "NeedSign";
		}
	}
	OnBeforeDestroyImplement() {
		this.OnClickToGet = void 0;
	}
}
class ImportantRewardItem extends (exports.SignRewardItemBase =
	SignRewardItemBase) {
	constructor() {
		super(...arguments), (this.BigIconPath = "");
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.OnClickToggle]]);
	}
	SetDayText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "DayNum", e);
	}
	SetStateText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
	}
	RefreshByData(e, t, i) {
		(this.Index = i),
			this.SetDayText(i + 1),
			this.SetStateText(this.GetRewardStateTextId(t));
		i = t === Protocol_1.Aki.Protocol.D0s.qms;
		var o = t === Protocol_1.Aki.Protocol.D0s.j0s,
			s = ((this.CanGetReward = o), this.GetText(4));
		s?.SetChangeColor(t === Protocol_1.Aki.Protocol.D0s.h3n, s.changeColor),
			this.GetItem(6).SetUIActive(i),
			this.GetItem(9).SetUIActive(!o && !i),
			this.GetSprite(7).SetUIActive(o),
			this.GetSprite(1).SetUIActive(o),
			(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				o ? "SP_NewSignInBigItemBg_Reward" : "SP_NewSignInBigItemBg_Normal",
			));
		this.SetSpriteByPath(t, this.GetSprite(0), !1),
			this.GetItem(8).SetUIActive(o),
			StringUtils_1.StringUtils.IsEmpty(this.BigIconPath) ||
				this.SetTextureByPath(this.BigIconPath, this.GetTexture(2));
	}
}
exports.ImportantRewardItem = ImportantRewardItem;
class NormalRewardItem extends SignRewardItemBase {
	constructor() {
		super(...arguments),
			(this.vFe = void 0),
			(this.Mne = 0),
			(this.MFe = () => {
				this.CanGetReward
					? this.OnClickToGet?.(this.Index)
					: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							this.Mne,
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIExtendToggle],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.OnClickToggle]]);
	}
	async OnBeforeStartAsync() {
		(this.vFe = new SmallItemGrid_1.SmallItemGrid()),
			(this.vFe.SkipDestroyActor = !0),
			await this.vFe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
			this.vFe.GetItemGridExtendToggle().CanExecuteChange.Bind(() => !1),
			this.vFe.BindOnExtendToggleClicked(this.MFe);
	}
	OnBeforeDestroy() {
		this.vFe && this.AddChild(this.vFe);
	}
	SetDayText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DayNum", e);
	}
	SetStateText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
	}
	RefreshByData(e, t, i) {
		(this.Index = i),
			(this.Mne = e.ItemId),
			this.SetDayText(i + 1),
			this.SetStateText(this.GetRewardStateTextId(t));
		i = t === Protocol_1.Aki.Protocol.D0s.qms;
		var o = t === Protocol_1.Aki.Protocol.D0s.j0s,
			s = ((this.CanGetReward = o), this.GetText(2));
		s?.SetChangeColor(t === Protocol_1.Aki.Protocol.D0s.h3n, s.changeColor),
			this.GetItem(4).SetUIActive(i),
			this.GetSprite(5).SetUIActive(o),
			this.GetSprite(6).SetUIActive(o),
			(s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				o ? "SP_NewSignInSmallItemBg_Reward" : "SP_NewSignInSmallItemBg_Normal",
			));
		this.SetSpriteByPath(s, this.GetSprite(7), !1),
			this.GetItem(8).SetUIActive(o),
			this.cNe(e, t);
	}
	cNe(e, t) {
		var i = e.Count,
			o =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					this.Mne,
				),
			s = t === Protocol_1.Aki.Protocol.D0s.j0s,
			r = t === Protocol_1.Aki.Protocol.D0s.h3n,
			n = t === Protocol_1.Aki.Protocol.D0s.qms;
		switch (o) {
			case 1:
				var a = {
					Data: e,
					ElementId: (a =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne))
						.ElementId,
					Type: 2,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					QualityId: a.QualityId,
					IsReceivableVisible: s,
					IsLockVisible: r,
					IsReceivedVisible: n,
				};
				this.vFe.Apply(a);
				break;
			case 3:
				(a = {
					Data: e,
					Type: 3,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					IsReceivableVisible: s,
					IsLockVisible: r,
					IsReceivedVisible: n,
				}),
					this.vFe.Apply(a);
				break;
			default:
				(a = {
					Data: e,
					Type: 4,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					IsReceivableVisible: s,
					IsLockVisible: r,
					IsReceivedVisible: n,
				}),
					this.vFe.Apply(a);
		}
	}
}
exports.NormalRewardItem = NormalRewardItem;
class VersionSignRewardItem extends SignRewardItemBase {
	constructor() {
		super(...arguments),
			(this._Ne = void 0),
			(this.Mne = 0),
			(this.SFe = () => {
				this.CanGetReward
					? this.OnClickToGet?.(this.Index)
					: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							this.Mne,
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickToggle]]);
	}
	OnStart() {
		(this._Ne = new SmallItemGrid_1.SmallItemGrid()),
			this._Ne.Initialize(this.GetItem(4).GetOwner()),
			this._Ne.BindOnCanExecuteChange(() => !1),
			this._Ne.BindOnExtendToggleClicked(this.SFe);
	}
	RefreshByData(e, t, i) {
		(this.Index = i), (this.Mne = e.ItemId), this.EFe(i + 1);
		i = t === Protocol_1.Aki.Protocol.D0s.qms;
		var o = t === Protocol_1.Aki.Protocol.D0s.j0s;
		(this.CanGetReward = o),
			this.yFe(this.GetRewardStateTextId(t)),
			this.GetItem(1).SetUIActive(o),
			this.GetItem(2).SetUIActive(i),
			this.cNe(e, t);
	}
	EFe(e) {
		this.GetText(5).SetText("0" + e.toString());
	}
	yFe(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
	}
	cNe(e, t) {
		var i = e.Count,
			o =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					this.Mne,
				),
			s =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.Mne)
					?.QualityId ?? 1,
			r = t === Protocol_1.Aki.Protocol.D0s.j0s,
			n = t === Protocol_1.Aki.Protocol.D0s.h3n,
			a = t === Protocol_1.Aki.Protocol.D0s.qms;
		switch (o) {
			case 1:
				var l = {
					Data: e,
					ElementId: (l =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne))
						.ElementId,
					Type: 2,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					QualityId: l.QualityId,
					IsReceivableVisible: r,
					IsLockVisible: n,
					IsReceivedVisible: a,
				};
				this._Ne.Apply(l);
				break;
			case 3:
				(l = {
					Data: e,
					Type: 3,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					IsReceivableVisible: r,
					IsLockVisible: n,
					IsReceivedVisible: a,
				}),
					this._Ne.Apply(l);
				break;
			default:
				(l = {
					Data: e,
					Type: 4,
					ItemConfigId: this.Mne,
					BottomText: i.toString(),
					IsReceivableVisible: r,
					IsLockVisible: n,
					IsReceivedVisible: a,
				}),
					this._Ne.Apply(l);
		}
		this.GetItem(6)?.SetUIActive(5 === s);
	}
}
exports.VersionSignRewardItem = VersionSignRewardItem;

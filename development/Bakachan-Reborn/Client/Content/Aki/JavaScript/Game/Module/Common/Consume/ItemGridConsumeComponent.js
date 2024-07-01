"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridConsumeComponent = void 0);
const UE = require("ue"),
	QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	ButtonItem_1 = require("../Button/ButtonItem"),
	CommonDropDown_1 = require("../DropDown/CommonDropDown"),
	OneTextDropDownItem_1 = require("../DropDown/Item/OneText/OneTextDropDownItem"),
	OneTextTitleItem_1 = require("../DropDown/Item/OneText/OneTextTitleItem"),
	ConsumeMediumItemGrid_1 = require("./ConsumeMediumItemGrid");
class ItemGridConsumeComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i = void 0) {
		super(),
			(this.ConsumeFunction = t),
			(this.BelongView = i),
			(this.StrengthItem = void 0),
			(this.ScrollView = void 0),
			(this.ConsumeList = []),
			(this.ZIt = 3),
			(this.MaxCount = 0),
			(this.EnoughMoney = !0),
			(this.XVe = void 0),
			(this.e6e = void 0),
			(this.eTt = void 0),
			(this.wqe = void 0),
			(this.ZVe = (e) => new OneTextDropDownItem_1.OneTextDropDownItem(e)),
			(this.zVe = (e) => new OneTextTitleItem_1.OneTextTitleItem(e)),
			(this.i6e = (e) => new LguiUtil_1.TableTextArgNew(e.ConsumeFilterText)),
			(this.YIt = () => {
				this.HasSelect()
					? this.ConsumeFunction.DeleteSelectFunction?.()
					: this.ConsumeFunction.AutoFunction &&
						this.ConsumeFunction.AutoFunction(this.ZIt);
			}),
			(this.t6e = (e) => {
				this.ZIt = e;
				var t =
					LocalStorage_1.LocalStorage.GetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
					) ?? new Map();
				t.set(this.eTt, e),
					LocalStorage_1.LocalStorage.SetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
						t,
					),
					this.e6e?.(e);
			}),
			(this.sGe = () => {
				var e = new ConsumeMediumItemGrid_1.ConsumeMediumItemGrid();
				return this.tTt(e), e;
			}),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[7, UE.UITexture],
			[1, UE.UIItem],
			[8, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIButtonComponent],
			[0, UE.UIText],
			[2, UE.UIItem],
			[9, UE.UIText],
			[6, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[15, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.YIt]]);
	}
	async OnBeforeStartAsync() {
		(this.XVe = new CommonDropDown_1.CommonDropDown(
			this.GetItem(2),
			this.ZVe,
			this.zVe,
		)),
			await this.XVe.Init();
	}
	InitFilter(e, t) {
		(this.e6e = t),
			(this.eTt = e),
			(t =
				LocalStorage_1.LocalStorage.GetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
				) ?? new Map()).has(e) && (this.ZIt = t.get(e)),
			(t = QualityInfoAll_1.configQualityInfoAll.GetConfigList()),
			this.XVe.SetOnSelectCall(this.t6e),
			this.XVe.SetShowType(1),
			this.XVe.InitScroll(t, this.i6e, this.ZIt),
			this.e6e(this.ZIt),
			this.GetItem(2).SetUIActive(!0);
	}
	HasSelect() {
		return 0 < this.GetSelectedGridCount();
	}
	GetSelectedGridCount() {
		let e = 0;
		if (this.ConsumeList && 0 !== this.ConsumeList.length)
			for (const t of this.ConsumeList) {
				if (0 === t[0].ItemId) break;
				e++;
			}
		return e;
	}
	iTt() {
		this.HasSelect()
			? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "DeleteSelect")
			: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "AutoSelect");
	}
	OnStart() {
		(this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(11))),
			this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
		var e = this.GetScrollViewWithScrollbar(5);
		(this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
			e,
			this.sGe,
		)),
			this.GetItem(2).SetUIActive(!1),
			(this.MaxCount =
				ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount());
	}
	GetCurrentDropDownSelectIndex() {
		return this.ZIt;
	}
	tTt(e) {
		e.BindReduceLongPress((e, t, i) => {
			void 0 !== i &&
				this.ConsumeFunction.ReduceItemFunction(i[0].IncId, i[0].ItemId);
		}),
			e.BindOnExtendToggleClicked((e) => {
				(e = e.Data),
					this.ConsumeFunction.MaterialItemFunction(e[0].IncId, e[0].ItemId);
			}),
			e.BindEmptySlotButtonCallback((e) => {
				this.ConsumeFunction.ItemClickFunction();
			}),
			e.BindOnCanExecuteChange(() => !1);
	}
	OnBeforeDestroy() {
		this.StrengthItem &&
			(this.StrengthItem.Destroy(), (this.StrengthItem = void 0)),
			this.XVe?.Destroy();
	}
	UpdateComponent(e, t, i) {
		(this.ConsumeList = i),
			this.ScrollView.RefreshByData(this.ConsumeList),
			(i = this.GetSelectedGridCount()),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(0),
				"WeaponMaterialLengthText",
				i,
				this.MaxCount,
			),
			(i = this.GetText(8)),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e)),
			i.SetText(t.toString()),
			(this.EnoughMoney = t <= e),
			i.SetChangeColor(!(t <= e), i.changeColor),
			this.iTt();
	}
	SetMaxState(e) {
		this.GetItem(6).SetUIActive(!e),
			this.SetStrengthItemEnable(!e),
			this.SetMaxItemEnable(e);
	}
	SetStrengthItemText(e) {
		this.StrengthItem.SetLocalText(e);
	}
	SetStrengthItemEnable(e) {
		this.StrengthItem.SetEnableClick(e);
	}
	SetMaxItemEnable(e) {
		this.GetItem(12).SetUIActive(e),
			this.GetItem(10).SetUIActive(!e),
			this.StrengthItem.SetActive(!e);
	}
	GetEnoughMoney() {
		return this.EnoughMoney;
	}
	SetMaxCount(e) {
		this.MaxCount = e;
	}
	GetMaxCount() {
		return this.MaxCount;
	}
	RefreshConditionText(e) {
		this.GetText(9).ShowTextNew(e);
	}
	SetConsumeTexture(e) {
		this.SetItemIcon(this.GetTexture(7), e);
	}
}
exports.ItemGridConsumeComponent = ItemGridConsumeComponent;

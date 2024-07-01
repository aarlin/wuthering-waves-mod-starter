"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropItemNew = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LongPressButtonItem_1 = require("../../Button/LongPressButtonItem"),
	SelectablePropItemBase_1 = require("./SelectablePropItemBase");
class SelectablePropItemNew extends SelectablePropItemBase_1.SelectablePropItemBase {
	constructor() {
		super(...arguments),
			(this.ShowItemTipsFunction = void 0),
			(this.AddFunction = void 0),
			(this.ReduceFunction = void 0),
			(this.GetSelectedNumber = void 0),
			(this.GetSelectedSpriteActive = void 0),
			(this.GetGraySpriteActive = void 0),
			(this.PromptFunction = void 0),
			(this.CheckEnableFunction = void 0),
			(this.HideSelectNumberStateFunction = void 0),
			(this.Bwt = !0),
			(this.IsSelectableProp = !0),
			(this.Kwt = void 0),
			(this.Qwt = void 0),
			(this.Xwt = !1),
			(this.Gwt = () => {
				var t;
				return this.Xwt && 1 === this.GetSelectedNumber?.(this.PropData)
					? this.Fwt()
					: (this.PromptFunction &&
							this.PromptFunction(this.PropData, this.GridIndex),
						!!this.AddFunction &&
							((t = this.AddFunction(this.PropData, this.GridIndex)) &&
								this.Vwt(),
							this.ScrollViewDelegate &&
								this.ScrollViewDelegate.SelectGridProxy(
									this.GridIndex,
									this.DisplayIndex,
									!1,
								),
							t));
			}),
			(this.Fwt = () => {
				var t;
				return (
					!!this.ReduceFunction &&
					((t = this.ReduceFunction(this.PropData, this.GridIndex)) &&
						(this.Vwt(), this.Hwt()),
					this.ScrollViewDelegate &&
						this.ScrollViewDelegate.SelectGridProxy(
							this.GridIndex,
							this.DisplayIndex,
							!1,
						),
					t)
				);
			}),
			(this.Nwt = (t) => {
				1 ===
					LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)
						.inputType &&
					(this.ShowItemTipsFunction?.(this.PropData, this.GridIndex),
					this.ScrollViewDelegate) &&
					this.ScrollViewDelegate.SelectGridProxy(
						this.GridIndex,
						this.DisplayIndex,
						!1,
					);
			}),
			(this.T7e = () => {
				var t, e;
				return !(
					!this.GetSelectableToggle() ||
					((t = this.GetSelectableToggle().GetToggleState()),
					0 < (e = this.GetSelectedNumber?.(this.PropData) ?? 0) && 1 === t) ||
					(e <= 0 && 0 === t)
				);
			});
	}
	OnStart() {
		var t;
		this.GetControlItem()?.SetUIActive(!1),
			this.GetSelectableToggle() &&
				((t = this.GetSelectableToggle()).OnPointEnterCallBack.Bind(this.Nwt),
				t.CanExecuteChange.Bind(this.T7e)),
			this.GetReduceButton() &&
				this.GetReduceButton().RootUIComp.SetUIActive(this.Bwt),
			(this.Kwt = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetSelectableToggle(),
				1,
				this.Gwt,
			)),
			this.Kwt.SetTickConditionDelegate(() => !this.Xwt),
			(this.Qwt = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetReduceButton(),
				1,
				this.Fwt,
			));
	}
	Vwt() {
		var t, e;
		this.HideSelectNumberStateFunction
			? this.SetControllerState(
					this.HideSelectNumberStateFunction(this.PropData, this.GridIndex),
				)
			: (0 < (this.GetSelectedNumber?.(this.PropData) ?? 0)
					? this.SetControllerState(!0)
					: this.SetControllerState(!1),
				this.Oqe()),
			this.GetSelectNumberText() &&
				((t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
					this.PropData.IncId,
				)),
				0 < (e = this.GetSelectedNumber?.(this.PropData) ?? 0) &&
				StringUtils_1.StringUtils.IsEmpty(t?.GetDefaultDownText())
					? LguiUtil_1.LguiUtil.SetLocalText(
							this.GetSelectNumberText(),
							"RoleExp",
							e,
							this.PropData.Count,
						)
					: this.ShowDefaultDownText());
	}
	SetControllerState(t) {
		var e = this.GetControlItem(),
			i = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(
				this.PropData,
			)[0];
		i
			? (e?.SetUIActive(t),
				t &&
					((t = 1 === i.GetMaxStackCount()),
					this.GetFinishSelectItem()?.SetUIActive(t)))
			: e?.SetUIActive(!1);
	}
	Oqe() {
		0 < (this.GetSelectedNumber?.(this.PropData) ?? 0)
			? this.fRt(1)
			: this.fRt(0);
	}
	fRt(t) {
		this.GetSelectableToggle() && this.GetSelectableToggle().SetToggleState(t);
	}
	jwt() {
		this.Vwt(), this.GetSelectItem()?.SetUIActive(!1);
	}
	Hwt() {
		(this.GetSelectedNumber?.(this.PropData) ?? 0) <= 0 && this.fRt(0);
	}
	OnBeforeDestroy() {
		this.GetSelectableToggle()?.CanExecuteChange.Unbind(),
			this.Qwt.Clear(),
			this.Kwt.Clear();
	}
	OnRefresh(t, e) {
		this.Vwt(), this.Oqe();
		var i = this.GetSelectedSpriteActive?.(this.PropData, this.GridIndex) ?? !1;
		this.GetSelectItem()?.SetUIActive(i);
	}
	OnSelected(t) {
		this.GetSelectItem()?.SetUIActive(!0);
	}
	OnDeselected(t) {
		this.jwt();
	}
	Clear() {
		this.Hwt(), this.jwt();
	}
	SetShowItemTipsFunction(t) {
		this.ShowItemTipsFunction = t;
	}
	SetSelectMode(t) {
		this.Xwt = t;
	}
	SetAddFunction(t) {
		this.AddFunction = t;
	}
	SetReduceFunction(t) {
		this.ReduceFunction = t;
	}
	SetSelectedNumber(t) {
		this.GetSelectedNumber = t;
	}
	SetSelectedSpriteActive(t) {
		this.GetSelectedSpriteActive = t;
	}
	SetGraySpriteActive(t) {
		this.GetGraySpriteActive = t;
	}
	SetReduceButtonActive(t) {
		this.Bwt = t;
	}
	SetPromptFunction(t) {
		this.PromptFunction = t;
	}
	SetCheckEnableFunction(t) {
		this.CheckEnableFunction = t;
	}
	SetHideSelectNumberStateFunction(t) {
		this.HideSelectNumberStateFunction = t;
	}
}
exports.SelectablePropItemNew = SelectablePropItemNew;

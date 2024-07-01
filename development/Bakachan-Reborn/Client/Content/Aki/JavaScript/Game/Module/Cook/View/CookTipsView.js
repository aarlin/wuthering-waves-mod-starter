"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookTipsView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	CookController_1 = require("../CookController"),
	CookItemView_1 = require("./CookItemView"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CookTipsView extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dqt = void 0),
			(this.tNt = void 0),
			(this.iNt = void 0),
			(this.oNt = void 0),
			(this.rNt = (t, e, o) => (
				(e = new CookItemView_1.MaterialItem(e)).Update(t, o),
				e.BindOnClickedCallback(this.x$e),
				{ Key: o, Value: e }
			)),
			(this.x$e = (t) => {
				t.m3n &&
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						t.G3n,
					);
			}),
			(this.Cqt = (t, e, o) => (
				(e = new CookItemView_1.MachiningClueItem(e)).Update(
					t.IsUnlock,
					t.ContentText,
				),
				{ Key: o, Value: e }
			)),
			(this.nNt = () => {
				if (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType) {
					var t = this.dqt;
					switch (t.SubType) {
						case 6e4:
							var e =
								ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
									t.ItemId,
								);
							CookController_1.CookController.SendCookFormulaRequest(e.Id);
							break;
						case 0:
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OpenCook,
								t.ItemId,
							);
					}
				} else {
					var o = this.dqt;
					o.IsUnLock
						? EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OpenCook,
								o.ItemId,
							)
						: EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OpenProcessedStudy,
								o.ItemId,
							);
				}
			}),
			(this.sNt = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"MaterialShort",
				);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[6, UE.UIItem],
			[8, UE.UIItem],
			[12, UE.UIText],
			[14, UE.UIText],
			[15, UE.UIText],
			[16, UE.UIText],
			[17, UE.UIItem],
			[18, UE.UIHorizontalLayout],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIVerticalLayout],
			[22, UE.UIText],
			[23, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[23, this.sNt]]);
	}
	OnBeforeDestroy() {
		this.iNt.ClearChildren(),
			(this.iNt = void 0),
			this.oNt.ClearChildren(),
			(this.oNt = void 0);
	}
	OnStart() {
		(this.tNt = new CookItemView_1.ConfirmButtonCompose(this.GetItem(8))),
			this.tNt.BindClickFunction(this.nNt),
			(this.iNt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(18),
				this.rNt,
			)),
			(this.oNt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(21),
				this.Cqt,
			));
	}
	RefreshTips(t) {
		switch ((this.dqt = t).MainType) {
			case 0:
				this.aNt();
				break;
			case 1:
				this.hNt();
		}
	}
	aNt() {
		var t = this.dqt;
		switch (t.SubType) {
			case 6e4:
				this.lNt(), this._Nt(t);
				break;
			case 0:
				this.uNt(), this.cNt(t);
		}
	}
	_Nt(t) {
		var e =
				ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
					t.ItemId,
				),
			o =
				(this.mNt(1),
				ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe"));
		this.dNt(o),
			(o = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name)),
			this.CNt(o),
			(o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId)),
			this.gNt(o.Icon),
			(t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
				e.FoodContent,
			)),
			this.fNt(t),
			(o = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
				e.FoodBackground,
			)),
			this.pNt(o),
			this.vNt(!0),
			(t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
		this.rFe(t, !0);
	}
	cNt(t) {
		var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
				t.ItemId,
			),
			o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				e.FoodItemId,
			),
			i =
				((o =
					(this.mNt(o),
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("Dishes"))),
				(o =
					(this.dNt(o),
					ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name))),
				(o =
					(this.CNt(o),
					ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FoodItemId))),
				this.gNt(o.Icon),
				ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
					o.AttributesDescription,
				));
		this.fNt(i),
			(i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
				o.BgDescription,
			)),
			this.pNt(i),
			(o = e.Proficiency),
			(i = e.MaxProficiencyCount),
			this.MNt(t.CookCount, o, i),
			(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking")),
			(o = CookController_1.CookController.CheckCanCook(t.ItemId));
		this.rFe(e, o), this.vNt(o), this.SNt(t.ItemId, 0);
	}
	lNt() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!1),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	uNt() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!0),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!0),
			this.GetText(16).SetUIActive(!0);
	}
	hNt() {
		this.ENt();
		var t = this.dqt,
			e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
				t.ItemId,
			),
			o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				e.FinalItemId,
			);
		this.mNt(o),
			(o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Accessory")),
			this.dNt(o),
			(o = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name)),
			this.CNt(o),
			(o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FinalItemId)),
			this.gNt(o.Icon),
			this.yNt(),
			(e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
				o.BgDescription,
			));
		this.INt(e);
		let i,
			n = !0;
		t.IsUnLock
			? ((i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking")),
				(n = CookController_1.CookController.CheckCanProcessed(t.ItemId)))
			: (i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Research")),
			this.rFe(i, n),
			this.vNt(n),
			this.SNt(t.ItemId, 1);
	}
	ENt() {
		this.GetText(3).SetUIActive(!1),
			this.GetText(12).SetUIActive(!1),
			this.GetItem(19).SetUIActive(!1),
			this.GetItem(20).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!0),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	CNt(t) {
		this.GetText(0).SetText(t);
	}
	gNt(t) {
		this.SetTextureByPath(t, this.GetTexture(1));
	}
	fNt(t) {
		this.GetText(3).SetText(t);
	}
	pNt(t) {
		this.GetText(12).SetText(t);
	}
	INt(t) {
		this.GetText(22).SetText(t);
	}
	dNt(t) {
		this.GetText(15).SetText(t);
	}
	mNt(t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), "Have", t);
	}
	MNt(t, e, o) {
		(t *= e) != (o *= e)
			? LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(2),
					"AddProficiency",
					"+" + e,
				)
			: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Proficiency"),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(16),
				"CumulativeProficiency",
				t,
				o,
			);
	}
	rFe(t, e) {
		this.tNt.UpdateText(t), this.tNt.RefreshButton(e);
	}
	vNt(t) {
		this.GetButton(23).GetOwner().GetUIItem().SetUIActive(!t);
	}
	SNt(t, e) {
		(t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(t, e)),
			this.iNt.RebuildLayoutByDataNew(t);
	}
	yNt() {
		var t = this.dqt,
			e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
				t.ItemId,
			),
			o = new Array();
		for (const a of e.InterationId) {
			var i,
				n = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(a);
			t.InteractiveList.includes(a)
				? ((i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
						n.Introduce,
					)),
					o.push({ IsUnlock: !0, ContentText: i }))
				: ((i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
						n.Description,
					)),
					o.push({ IsUnlock: !1, ContentText: i }));
		}
		this.oNt.RebuildLayoutByDataNew(o);
	}
}
exports.CookTipsView = CookTipsView;

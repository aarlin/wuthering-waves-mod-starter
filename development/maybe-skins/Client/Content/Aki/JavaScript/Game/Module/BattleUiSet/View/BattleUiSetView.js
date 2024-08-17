"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
	TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	EditMobileBattleView_1 = require("./EditMobileBattleView"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class BattleUiSetView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.oCt = void 0),
			(this.SelectedPanelItem = void 0),
			(this.rCt = new Set()),
			(this.nCt = 0),
			(this.wit = new UE.Vector()),
			(this.sCt = void 0),
			(this.aCt = void 0),
			(this.OnTouch = (e, t) => {
				t = t.TouchType;
				var i = Number(e);
				switch (t) {
					case 0:
						this.hCt(!0, i);
						break;
					case 1:
						this.hCt(!1, i);
						break;
					case 2:
						this.lCt(i);
				}
			}),
			(this._Ct = () => {
				this.nCt = 2;
			}),
			(this.uCt = () => {
				this.nCt = 0;
			}),
			(this.cCt = () => {
				this.nCt = 1;
			}),
			(this.mCt = () => {
				this.nCt = 0;
			}),
			(this.dCt = () => {
				this.nCt = 3;
			}),
			(this.CCt = () => {
				this.nCt = 0;
			}),
			(this.gCt = () => {
				this.nCt = 4;
			}),
			(this.fCt = () => {
				this.nCt = 0;
			}),
			(this.pCt = (e) => {
				var t = e.GetLocalPointInPlane(),
					i = e.dragComponent.GetOwner().GetUIItem().GetDisplayName(),
					n = this.GetItem(11);
				if (i === n.GetDisplayName()) {
					if (this.sCt) {
						if (
							((i = e.dragComponent.GetOwner().GetActorScale3D()),
							(n = t.X - this.sCt.X),
							(e = t.Y - this.sCt.Y),
							0 == n || 0 == e)
						)
							return;
						(this.aCt.X += n * i.X),
							(this.aCt.Y += e * i.Y),
							this.SetRelativeLocation(this.aCt);
					}
					this.sCt = t;
				}
			}),
			(this.vCt = () => {
				this.sCt = void 0;
			}),
			(this.MCt = () => {
				this.sCt = void 0;
			}),
			(this.SCt = (e) => {
				this.SelectedPanelItem && this.SelectedPanelItem.SetSelected(!1);
				var t = this.oCt.GetPanelItem(e);
				(this.SelectedPanelItem = t) && (t.SetSelected(!0), this.ECt(e)),
					this.yCt(t),
					this.rCt.add(t),
					t.ApplyTopIndex(),
					this.oCt.RefreshHierarchyIndex();
			}),
			(this.ICt = (e) => {
				this.TCt(e);
			}),
			(this.LCt = (e) => {
				var t =
					ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
				this.SelectedPanelItem &&
					t &&
					t.CanEdit &&
					((t.EditAlpha = e),
					(this.wit.X = e),
					(this.wit.Y = e),
					(this.wit.Z = e),
					this.SelectedPanelItem.GetRootItem().SetUIItemAlpha(e));
			}),
			(this.DCt = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105);
				e.FunctionMap.set(2, () => {
					this.oCt.ResetAllPanelItem();
					var e = ModelManager_1.ModelManager.BattleUiSetModel;
					this.RCt(e.SelectedPanelItemData), e.ResetSettings();
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.UCt = () => {
				for (const t of this.rCt) {
					if (!(e = t.PanelItemData) || e.IsCheckOverlap) {
						var e = t.GetRootItem();
						if (this.oCt.IsAnyItemOverlap(e))
							return (
								(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									103,
								)).FunctionMap.set(2, () => {
									this.oCt.SavePanelItem(),
										ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
										UiManager_1.UiManager.CloseView("BattleUiSetView");
								}),
								void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									e,
								)
							);
					}
				}
				this.oCt.SavePanelItem(),
					ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
					UiManager_1.UiManager.CloseView("BattleUiSetView");
			}),
			(this.ACt = () => {
				var e;
				this.PCt()
					? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							104,
						)).FunctionMap.set(1, () => {
							ModelManager_1.ModelManager.BattleUiSetModel.ReInitSettings(),
								UiManager_1.UiManager.CloseView("BattleUiSetView");
						}),
						e.FunctionMap.set(2, () => {
							ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
								UiManager_1.UiManager.CloseView("BattleUiSetView");
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						))
					: (ModelManager_1.ModelManager.BattleUiSetModel.ReInitSettings(),
						UiManager_1.UiManager.CloseView("BattleUiSetView"));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISliderComponent],
			[2, UE.UISliderComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIButtonComponent],
			[10, UE.UIDraggableComponent],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[7, this.DCt],
				[8, this.UCt],
				[9, this.ACt],
			]);
	}
	OnBeforeDestroy() {
		(this.SelectedPanelItem = void 0),
			this.rCt.clear(),
			this.oCt?.Destroy(),
			(this.oCt = void 0);
	}
	OnAddEventListener() {
		var e;
		this.GetSlider(2).OnValueChangeCb.Bind(this.ICt),
			this.GetSlider(1).OnValueChangeCb.Bind(this.LCt),
			(e =
				((e =
					((e =
						((e =
							((e = this.GetButton(3)).OnPointDownCallBack.Bind(this._Ct),
							e.OnPointUpCallBack.Bind(this.uCt),
							this.GetButton(4))).OnPointDownCallBack.Bind(this.cCt),
						e.OnPointUpCallBack.Bind(this.mCt),
						this.GetButton(6))).OnPointDownCallBack.Bind(this.dCt),
					e.OnPointUpCallBack.Bind(this.CCt),
					this.GetButton(5))).OnPointDownCallBack.Bind(this.gCt),
				e.OnPointUpCallBack.Bind(this.fCt),
				this.GetDraggable(10))).OnPointerBeginDragCallBack.Bind(this.vCt),
			e.OnPointerDragCallBack.Bind(this.pCt),
			e.OnPointerEndDragCallBack.Bind(this.MCt),
			InputDistributeController_1.InputDistributeController.BindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
					InputMappingsDefine_1.touchIdMappings.Touch3,
					InputMappingsDefine_1.touchIdMappings.Touch4,
					InputMappingsDefine_1.touchIdMappings.Touch5,
					InputMappingsDefine_1.touchIdMappings.Touch6,
					InputMappingsDefine_1.touchIdMappings.Touch7,
					InputMappingsDefine_1.touchIdMappings.Touch8,
					InputMappingsDefine_1.touchIdMappings.Touch9,
					InputMappingsDefine_1.touchIdMappings.Touch10,
				],
				this.OnTouch,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectedEditPanelItem,
				this.SCt,
			);
	}
	OnRemoveEventListener() {
		var e;
		this.GetSlider(2).OnValueChangeCb.Unbind(),
			this.GetSlider(1).OnValueChangeCb.Unbind(),
			(e =
				((e =
					((e =
						((e =
							((e = this.GetButton(3)).OnPointDownCallBack.Unbind(),
							e.OnPointUpCallBack.Unbind(),
							this.GetButton(4))).OnPointDownCallBack.Unbind(),
						e.OnPointUpCallBack.Unbind(),
						this.GetButton(6))).OnPointDownCallBack.Unbind(),
					e.OnPointUpCallBack.Unbind(),
					this.GetButton(5))).OnPointDownCallBack.Unbind(),
				e.OnPointUpCallBack.Unbind(),
				this.GetDraggable(10))).OnPointerBeginDragCallBack.Unbind(),
			e.OnPointerDragCallBack.Unbind(),
			e.OnPointerEndDragCallBack.Unbind(),
			InputDistributeController_1.InputDistributeController.UnBindTouches(
				[
					InputMappingsDefine_1.touchIdMappings.Touch1,
					InputMappingsDefine_1.touchIdMappings.Touch2,
					InputMappingsDefine_1.touchIdMappings.Touch3,
					InputMappingsDefine_1.touchIdMappings.Touch4,
					InputMappingsDefine_1.touchIdMappings.Touch5,
					InputMappingsDefine_1.touchIdMappings.Touch6,
					InputMappingsDefine_1.touchIdMappings.Touch7,
					InputMappingsDefine_1.touchIdMappings.Touch8,
					InputMappingsDefine_1.touchIdMappings.Touch9,
					InputMappingsDefine_1.touchIdMappings.Touch10,
				],
				this.OnTouch,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSelectedEditPanelItem,
				this.SCt,
			);
	}
	hCt(e, t) {
		(t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t)) &&
			(e
				? ModelManager_1.ModelManager.BattleUiSetModel.AddTouchFingerData(t)
				: ModelManager_1.ModelManager.BattleUiSetModel.RemoveTouchFingerData(
						t,
					));
	}
	lCt(e) {
		var t,
			i,
			n = ModelManager_1.ModelManager.BattleUiSetModel,
			a = n.SelectedPanelItemData;
		!a ||
			n.GetTouchFingerDataCount() < 2 ||
			((i = n.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.One)),
			(t = n.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.Two)),
			(i = i.GetFingerIndex()),
			(t = t.GetFingerIndex()),
			(i = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
				i,
				t,
			)),
			(t = MathUtils_1.MathUtils.RangeClamp(
				i,
				n.MinTouchMoveDifference,
				n.MaxTouchMoveDifference,
				n.MinTouchMoveValue,
				n.MaxTouchMoveValue,
			)),
			(i = a.EditSize + t * n.ControlScaleRate),
			(t = (a = this.GetSlider(2)).MinValue),
			(n = a.MaxValue),
			(i = MathUtils_1.MathUtils.Clamp(i, t, n)),
			this.TCt(i),
			a.SetValue(i));
	}
	OnTick(e) {
		if (
			(super.OnTick(e),
			0 !== this.nCt &&
				(e =
					ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData) &&
				e.CanEdit)
		) {
			var t = this.oCt.GetPanelItem(e);
			if (t) {
				var i = t.GetRelativeLocation();
				switch (this.nCt) {
					case 1:
						i.Y++, t.SetRelativeLocation(i);
						break;
					case 2:
						i.Y--, t.SetRelativeLocation(i);
						break;
					case 3:
						i.X--, t.SetRelativeLocation(i);
						break;
					case 4:
						i.X++, t.SetRelativeLocation(i);
				}
			}
		}
	}
	ClampBound(e) {
		var t = (r = this.GetItem(11)).GetOwner().GetActorScale3D().X,
			i = (n = r.GetPivot()).Y,
			n = n.X,
			a =
				(o = this.RootItem.GetRenderCanvas().GetOwner().GetUIItem()).Width / 2,
			o = o.Height / 2,
			l = r.Width * t,
			r = r.Height * t;
		(e.X = MathUtils_1.MathUtils.Clamp(e.X, l * n - a, a - l * (1 - n))),
			(e.Y = MathUtils_1.MathUtils.Clamp(e.Y, r * i - o, o - r * (1 - i)));
	}
	SetRelativeLocation(e) {
		var t = this.GetItem(11);
		this.ClampBound(e), t.SetUIRelativeLocation(e);
	}
	yCt(e) {
		var t;
		e &&
			((e = e.GetRootItem()),
			(t = this.GetItem(12))
				.GetOwner()
				.K2_AttachToActor(e.GetOwner(), void 0, 2, 0, 0, !1),
			t.SetAnchorAlign(4, 4),
			t.SetStretchLeft(0),
			t.SetStretchRight(0),
			t.SetStretchTop(0),
			t.SetStretchBottom(0),
			t.SetUIActive(!0));
	}
	TCt(e) {
		var t = ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
		this.SelectedPanelItem &&
			t &&
			t.CanEdit &&
			((t.EditSize = e),
			(this.wit.X = e),
			(this.wit.Y = e),
			(this.wit.Z = e),
			this.SelectedPanelItem.GetRootItem().SetUIItemScale(this.wit));
	}
	OnStart() {
		(this.aCt = this.GetItem(11).RelativeLocation),
			(this.oCt = new EditMobileBattleView_1.EditMobileBattleView(
				this.GetItem(0),
			));
	}
	PCt() {
		for (const e of ModelManager_1.ModelManager.BattleUiSetModel.GetPanelItemDataMap().values())
			if (e.IsEdited()) return !0;
		return !1;
	}
	ECt(e) {
		var t, i;
		e &&
			((t = this.GetSlider(2)),
			(i = this.GetSlider(1)),
			t.SetValue(e.EditSize),
			i.SetValue(e.EditAlpha));
	}
	RCt(e) {
		var t, i;
		e &&
			((t = this.GetSlider(2)),
			(i = this.GetSlider(1)),
			t.SetValue(e.SourceSize),
			i.SetValue(e.SourceAlpha));
	}
}
exports.BattleUiSetView = BattleUiSetView;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItemView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	MarkChildIconComponent_1 = require("./Components/MarkChildIconComponent"),
	MarkNameComponent_1 = require("./Components/MarkNameComponent"),
	MarkOutOfBoundComponent_1 = require("./Components/MarkOutOfBoundComponent"),
	MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
	MarkSelectComponent_1 = require("./Components/MarkSelectComponent"),
	MarkTrackComponent_1 = require("./Components/MarkTrackComponent"),
	MarkVerticalPointerComponent_1 = require("./Components/MarkVerticalPointerComponent"),
	POINTER_RANGE = 2e3;
class MarkItemView extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Holder = void 0),
			(this.IsSelectedInternal = !1),
			(this.IsShowIcon = !0),
			(this.NTi = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.OutOfBoundComponentInternal = void 0),
			(this.SelectComponentInternal = void 0),
			(this.TrackComponentInternal = void 0),
			(this.RangeComponentInternal = void 0),
			(this.NameComponentInternal = void 0),
			(this.VerticalPointerComponentInternal = void 0),
			(this.ChildIconComponentInternal = void 0),
			(this.OTi = void 0),
			(this.kTi = void 0),
			(this.FTi = void 0),
			(this.VTi = void 0),
			(this.HTi = !1),
			(this.jTi = void 0),
			(this.WTi = void 0),
			(this.KTi = void 0),
			(this.QTi = void 0),
			(this.$Ti = void 0),
			(this.XTi = void 0),
			(this.YTi = void 0),
			(this.JTi = !1),
			(this.zTi = !1),
			(this.ZTi = void 0),
			(this.eLi = 0),
			(this.OnLevelSequenceStart = (t) => {
				this.Holder.OnLevelSequenceStart(t);
			}),
			(this.OnLevelSequenceStop = (t) => {
				this.Holder.OnLevelSequenceStop(t),
					"HideView" === t &&
						((t = this.Holder.IsCanShowView),
						this.SetUiActive(t),
						this.FTi?.SetAlpha(1));
			}),
			(this.Holder = t),
			(this.NTi = new UE.Vector());
	}
	get LoadingPromise() {
		return this.OTi;
	}
	get IsSelected() {
		return this.IsSelectedInternal;
	}
	set IsSelected(t) {
		this.IsSelectedInternal !== t &&
			((this.IsSelectedInternal = t), this.OnSelectedStateChange(t));
	}
	async GetNameComponentAsync() {
		return (
			this.NameComponentInternal ||
				(this.NameComponentInternal =
					new MarkNameComponent_1.MarkNameComponent()),
			this.jTi ||
				(this.jTi = this.NameComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkMapName_Prefab",
					this.FTi,
					!0,
				)),
			await this.jTi,
			this.NameComponentInternal
		);
	}
	async GetRangeComponentAsync() {
		return (
			this.RangeComponentInternal ||
				(this.RangeComponentInternal =
					new MarkRangeImageComponent_1.MarkRangeImageComponent()),
			this.WTi ||
				(this.WTi = this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkArea_Prefab",
					this.FTi,
					!0,
				)),
			await this.WTi,
			this.RangeComponentInternal
		);
	}
	async GetOutOfBoundComponentAsync() {
		return (
			this.OutOfBoundComponentInternal ||
				(this.OutOfBoundComponentInternal =
					new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent()),
			this.KTi ||
				(this.KTi =
					this.OutOfBoundComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkOut_Prefab",
						this.FTi,
						!0,
					)),
			await this.KTi,
			this.OutOfBoundComponentInternal
		);
	}
	async GetSelectComponentAsync() {
		return (
			this.SelectComponentInternal ||
				(this.SelectComponentInternal =
					new MarkSelectComponent_1.MarkSelectComponent()),
			this.QTi ||
				(this.QTi =
					this.SelectComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkChoose_Prefab",
						this.FTi,
						!0,
					)),
			await this.QTi,
			this.SelectComponentInternal
		);
	}
	async GetTrackComponentAsync() {
		return (
			this.TrackComponentInternal ||
				((this.TrackComponentInternal =
					new MarkTrackComponent_1.MarkTrackComponent()),
				(this.TrackComponentInternal.MapType = this.Holder.MapType)),
			this.$Ti ||
				(this.$Ti = this.TrackComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkTrackNia_Prefab",
					this.FTi,
					!0,
				)),
			await this.$Ti,
			this.TrackComponentInternal
		);
	}
	async GetVerticalPointerComponentAsync() {
		return (
			this.VerticalPointerComponentInternal ||
				(this.VerticalPointerComponentInternal =
					new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent()),
			this.XTi ||
				(this.XTi =
					this.VerticalPointerComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkArrow_Prefab",
						this.FTi,
						!0,
					)),
			await this.XTi,
			this.VerticalPointerComponentInternal
		);
	}
	async GetChildIconComponentAsync() {
		return (
			this.ChildIconComponentInternal ||
				(this.ChildIconComponentInternal =
					new MarkChildIconComponent_1.MarkChildIconComponent()),
			this.YTi ||
				(this.YTi =
					this.ChildIconComponentInternal.CreateThenShowByResourceIdAsync(
						"UiItem_MarkChildNode_Prefab",
						this.FTi,
						!0,
					)),
			await this.YTi,
			this.ChildIconComponentInternal
		);
	}
	async InitializeMarkItemViewAsync() {
		(this.OTi = this.CreateThenShowByResourceIdAsync(
			"UiItem_WorldMapMark_Prefab",
			this.Holder.ViewRoot,
			!0,
		)),
			await this.OTi,
			this.tLi(this.HTi);
	}
	OnSelectedStateChange(t) {}
	OnInitialize() {}
	GetIconItem() {
		return this.GetSprite(1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			this.RootActor.SetActorLabel(
				`MarkId:${this.Holder.MarkId},ShowPriority:` + this.Holder.ShowPriority,
			),
			(this.FTi = this.GetItem(0)),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.LevelSequencePlayer.BindSequenceStartEvent(
				this.OnLevelSequenceStart,
			),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.OnLevelSequenceStop),
			this.GetSprite(1).SetUIActive(!1);
		var t = new UE.Vector(this.Holder.ConfigScale);
		this.GetSprite(1).SetUIItemScale(t),
			this.SetScale(this.Holder.MarkScale),
			this.OnInitialize(),
			void 0 !== this.VTi && (this.VTi(), (this.VTi = void 0)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMarkItemViewCreate,
				this,
			);
	}
	OnBeforeDestroy() {
		this.OutOfBoundComponentInternal?.Destroy(),
			this.SelectComponentInternal?.Destroy(),
			this.TrackComponentInternal?.Destroy(),
			this.RangeComponentInternal?.Destroy(),
			this.NameComponentInternal?.Destroy(),
			this.VerticalPointerComponentInternal?.Destroy(),
			this.ChildIconComponentInternal?.Destroy(),
			(this.OutOfBoundComponentInternal = void 0),
			(this.SelectComponentInternal = void 0),
			(this.TrackComponentInternal = void 0),
			(this.RangeComponentInternal = void 0),
			(this.NameComponentInternal = void 0),
			(this.VerticalPointerComponentInternal = void 0),
			(this.ChildIconComponentInternal = void 0),
			this.LevelSequencePlayer?.Clear(),
			(this.LevelSequencePlayer = void 0),
			(this.OTi = void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMarkItemViewDestroy,
				this,
			),
			(this.Holder = void 0);
	}
	SetScale(t, i = !0) {
		this.NTi.Set(t, t, t),
			i
				? this.RootItem.SetWorldScale3D(this.NTi)
				: this.RootItem.SetRelativeScale3D(this.NTi);
	}
	OnUpdate(t, i = !1, e = !1) {
		if (void 0 === this.Holder)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Map",
					35,
					"Holder is undefined",
					["ComponentState", this.IsDestroyOrDestroying],
					["isCreating", this.IsCreating],
				);
		else if (((this.HTi = e), this.IsCreating || this.IsDestroyOrDestroying))
			this.VTi = () => {
				this.OnUpdate(t, i, e);
			};
		else {
			this.tLi(this.HTi);
			var s = this.Holder.IsCanShowView;
			if ((this.SetUiActive(s), s)) {
				2 === this.Holder.MapType &&
					((s = CommonParamById_1.configCommonParamById.GetFloatConfig(
						"MapMarkSelectedAdditionScale",
					)),
					(s = this.IsSelected ? s : 0),
					this.SetScale(this.Holder.MarkScale + s));
				s = this.Holder.IsOutOfBound;
				(this.JTi === s && void 0 !== this.JTi) ||
					((this.JTi = s),
					this.JTi
						? this.GetOutOfBoundComponentAsync().then(
								(t) => {
									t.SetActive(!0);
								},
								void 0,
							)
						: this.OutOfBoundComponentInternal?.SetActive(!1)),
					(s = this.Holder.IsTracked && !i),
					(this.zTi === s && void 0 !== this.zTi) ||
						((this.zTi = s),
						this.zTi
							? this.GetTrackComponentAsync().then(
									(t) => {
										t.SetActive(!0);
									},
									void 0,
								)
							: this.TrackComponentInternal?.SetActive(!1)),
					(s = this.IsSelected),
					(this.ZTi === s && void 0 !== this.ZTi) ||
						(this.IsSelected
							? this.GetSelectComponentAsync().then(
									(t) => {
										t.SetActive(!0);
									},
									void 0,
								)
							: this.SelectComponentInternal?.SetActive(!1),
						(this.ZTi = s));
				const h = this.iLi(this.Holder.WorldPosition, t);
				this.eLi !== h &&
					((this.eLi = h),
					this.GetVerticalPointerComponentAsync().then(
						(t) => {
							switch (h) {
								case 0:
									t.HideSelf();
									break;
								case 1:
									t.ShowUp();
									break;
								case 2:
									t.ShowDown();
							}
						},
						void 0,
					));
			}
		}
	}
	tLi(t) {
		if (void 0 === this.Holder)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Map",
					35,
					"Holder is undefined",
					["ComponentState", this.IsDestroyOrDestroying],
					["isCreating", this.IsCreating],
				);
		else {
			if (t) {
				if (this.Holder.NeedPlayShowOrHideSeq) {
					switch (this.Holder.NeedPlayShowOrHideSeq) {
						case "ShowView":
							this.PlayInShowScaleRangeSequence();
							break;
						case "HideView":
							this.PlayOutShowScaleRangeSequence();
					}
					this.Holder.NeedPlayShowOrHideSeq = void 0;
				}
			} else
				(this.Holder.NeedPlayShowOrHideSeq = void 0),
					this.Holder.OnLevelSequenceStop("HideView");
			this.HTi = !1;
		}
	}
	SetOutOfBoundDirection(e) {
		this.GetOutOfBoundComponentAsync().then(
			(t) => {
				var i = this.Holder.UiPosition,
					i = Vector2D_1.Vector2D.Create(i.X, i.Y);
				i.SubtractionEqual(e), t.SetOutOfBoundDirection(i);
			},
			void 0,
		);
	}
	OnStartTrack() {}
	OnEndTrack() {}
	OnIconPathChanged(t) {
		var i = this.GetSprite(1);
		this.LoadIcon(i, t);
	}
	LoadIcon(t, i) {
		t &&
			!StringUtils_1.StringUtils.IsEmpty(i) &&
			this.SetSpriteByPath(i, t, !1, void 0, () => {
				t.SetUIActive(this.IsShowIcon);
			});
	}
	async LoadIconAsync(t, i) {
		await this.OTi;
		const e = new CustomPromise_1.CustomPromise();
		(this.kTi = e.Promise),
			t && !StringUtils_1.StringUtils.IsEmpty(i)
				? this.SetSpriteByPath(i, t, !1, void 0, () => {
						t.SetUIActive(this.IsShowIcon), e.SetResult();
					})
				: (e.SetResult(),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Map",
							50,
							"标记设置失败,检查传入的参数是否有空值",
						)),
			await this.kTi;
	}
	GetInteractiveFlag() {
		return this.Holder?.IsCanShowView ?? !1;
	}
	GetMarkPriorityKey(t, i = 0) {
		let e = 0;
		switch (t) {
			case 9:
				e = 1e3;
				break;
			case 11:
				e = 3e3;
				break;
			case 12:
				e = 2e3;
				break;
			default:
				e = i;
		}
		return e;
	}
	iLi(t, i) {
		return 2 === this.Holder.MapType ||
			((t = t.Z - i.Z), Math.abs(t) < POINTER_RANGE)
			? 0
			: t < 0
				? 1
				: 2;
	}
	PlayInShowScaleRangeSequence() {
		this.LevelSequencePlayer.StopCurrentSequence(),
			this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
	}
	PlayOutShowScaleRangeSequence() {
		this.LevelSequencePlayer.StopCurrentSequence(),
			this.LevelSequencePlayer.PlayLevelSequenceByName("HideView");
	}
	async PlayUnlockSequence() {}
}
exports.MarkItemView = MarkItemView;
//# sourceMappingURL=MarkItemView.js.map